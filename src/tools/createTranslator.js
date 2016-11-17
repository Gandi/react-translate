// @flow weak

import Counterpart from 'counterpart';
import moment from 'moment';
// $FlowIssue
import IntlPolyfill from 'intl';
import warning from 'warning';

import enhanceTranslate from './enhanceTranslate';

import type { Translator } from './types';


/**
 * Create the translator.
 *
 * @param Object   i18n        Translations data and configuration
 * @param Function dispatch    Dispatch function used for logging
 * @return Object
 */
function createTranslator(i18n: Object): Translator {
  const i18nDefaultParams = {
    translations: {},
    localeData: {},
    locale: 'en',
    defaultLocale: 'en',
    logMissing: false,
    scope: '',
    ...i18n,
  };

  // Patch the native Intl native node API because it is only shipped with "en" locale by default.
  if (global.__SERVER__) {
    // $FlowIssue Intl is not available in Flow Core annotations
    Intl.NumberFormat = IntlPolyfill.NumberFormat;
    Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
  }

  /* eslint-disable no-underscore-dangle */
  /**
   * Register relevant localeData if we're using the browser polyfill.
   * Note: IntlPolyfill overrides the Intl global if the polyfill is needed.
   */
  if (global.__CLIENT__) {
    if (typeof IntlPolyfill.__addLocaleData === 'function') {
      IntlPolyfill.__addLocaleData(i18nDefaultParams.localeData);
    }
  }
  /* eslint-enable no-underscore-dangle */

  const { translations, locale, defaultLocale, logMissing } = i18nDefaultParams;

  const translator = new Counterpart.Instance();
  const availableLanguages = [locale, defaultLocale];

  // register only two locales: the current and the default.
  // no needs to register all available locales,
  // if the user change the locale, we reload the entire page.
  availableLanguages.forEach((locale_) => {
    translator.registerTranslations(locale_, translations);
  });

  translator.setLocale(locale);

  // fall back to the default language when a translation
  // (or the pluralization function) is not found.
  translator.setFallbackLocale(defaultLocale);

  // use pipe separator in order to support dots in translations
  // Note: pipes are also used to handle our custom plural notation.
  // Counterpart will make nested dicts to handle plurals but everything works
  // as expected.
  translator.setSeparator('|');

  if (logMissing) {
    // display warning if the translation has not been found.
    const handleTranslationNotFound = (requestedLocale, key) => {
      warning(false, `Translation not found: ${requestedLocale} => "${key}"`);
    };
    translator.onTranslationNotFound(handleTranslationNotFound);
  }

  // translate texts
  // Enchance the translate function with namespace, fallback, ...
  const translate = enhanceTranslate(i18n.scope, translator.translate.bind(translator));

  // translate date
  // (to avoid different tz between server and client, consider that all dates
  // are UTC)
  const localize = (date) => (
    moment.utc(date).locale(locale)
  );

  /**
   * Create a `Intl.NumberFormat` with `options`.
   * Locale is auto injected from user configuration.
   */
  const createNumberFormat = (options = {}) =>
    // $FlowIssue
    new Intl.NumberFormat(locale, {
      // This would be the perfect place to define default currency
      // currency: null,
      ...options,
    });

  /**
   * Return the currency symbol according to current locale from it's ISO code.
   * Use the localeData provided by Intl polyfill to map.
   * @param string   currencyISO   Currency ISO string
   * @return string
   */
  const mapCurrencyISOToSymbol = (currencyISO) => {
    const { number } = i18nDefaultParams.localeData;
    if (number && number.currencies && number.currencies[currencyISO]) {
      return number.currencies[currencyISO];
    }

    return currencyISO;
  };

  return { translator, translate, localize, createNumberFormat, mapCurrencyISOToSymbol };
}

export default createTranslator;
