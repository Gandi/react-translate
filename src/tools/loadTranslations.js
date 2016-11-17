/* eslint no-console: 0 */

/**
 * Note: This module is not exported by the entry point of that lib
 * to avoid to have to handle 'fs' module client-side.
 *
 * This module is intended to be used inside a Webpack build and should be
 * imported imported directly from dist directory once installed.
 */

import path from 'path';
import fs from 'fs';
import fixWeblateFormat from './fixWeblateFormat';


/**
 * Weblate uses POSIX locale format (with an underscore separator),
 * while HTTP and HTML specs use IETF language tags (with a dash separator,
 * and a variant that is not necessarily a country code).
 *
 * Two-letter languages are the same in both formats.
 *
 * The locale/language format used in the Gandi account is IETF language tag.
 * ```
 */
const languageTagToLocale = (locale) => {
  const localeConversion = {
    'zh-hans': 'zh_CN',
    'zh-hant': 'zh_TW',
  };
  return localeConversion[locale] || locale;
};

/**
 * Read translations (JSON files) and build an object like:
 * {locale: namespace: value}
 *
 * @param  {Array}  availableLanguages  list of supported languages
 * @param  {String} localesDir          directory where to find locales
 * @return {Object} Merged translations
 */
const loadTranslations = (availableLanguages, localesDir) => {
  if (!Array.isArray(availableLanguages)) {
    throw new Error('availableLanguages should be an array.');
  }

  const allTranslations = availableLanguages.reduce((acc, language) => {
    const locale = languageTagToLocale(language);
    const dirName = path.join(localesDir, locale);

    const files = fs.readdirSync(dirName);

    // Extract all translations for current lang
    const langTranslations = files.reduce((fileAcc, file) => {
      const fileName = path.join(dirName, file);
      const namespace = file.replace(/.json$/, '');
      if (namespace === file) {
        // Skip non-json files (for example, .swp files).
        console.log(`Skipping ${file}`);
        return fileAcc;
      }

      try {
        let json = JSON.parse(fs.readFileSync(fileName));
        json = fixWeblateFormat(json);

        return {
          ...fileAcc,
          [namespace]: json,
        };
      } catch (err) {
        throw new Error(`The file ${fileName} is missing or invalid.`);
      }
    }, {});

    return {
      ...acc,
      [language]: langTranslations,
    };
  }, {});

  return allTranslations;
};

export default loadTranslations;
