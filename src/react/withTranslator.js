// @flow weak

import React, { PropTypes } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import shallowEqual from 'shallowequal';

import { getDataDependency, getDisplayName, getProps } from './component-helper.js';

import translatorType from './translatorType';
import type { WithTranslatorOptions, WithTranslatorFinalOptions } from './types';
import type { Translator } from '../tools/types';


/**
 * Create props injected in composants.
 * @param  {Object} translator  gandi translator object
 * @return {Object}
 */
const createTranslatorProps = (translator: Translator) => {
  const {
    translate,
    localize,
    createNumberFormat,
    mapCurrencyISOToSymbol,
  } = translator;

  return {
    __: translate,

    /**
     * Format dates.
     * @param  {Object} date     Date to format
     * @param  {String} format   Output format
     * @return {String}          Date formatted
     */
    formatDate: (date, format = 'LLL Z') => localize(date).format(format),

    /**
     * Format prices.
     * @param  {String | Number} price      Price to format
     * @param  {String} currency            Currency
     * @return {String}                     Price formatted
     */
    formatNumber: (number, options = {}) =>
      createNumberFormat({ style: 'decimal', ...options }).format(number),

    /**
     * Format prices.
     * @param  {String | Number} price      Price to format
     * @param  {String} currency            Currency
     * @return {String}                     Price formatted
     */
    formatPrice: (price, currency) => {
      const options = { style: 'currency' };
      // $FlowIssue
      if (currency) options.currency = currency;
      return createNumberFormat(options).format(price);
    },

    /**
     * Return the currency symbol according to current locale from it's ISO code.
     * Use the localeData provided by Intl polyfill to map.
     * @param string   currencyISO   Currency ISO string
     * @return string
     */
    formatCurrency: mapCurrencyISOToSymbol,

    /**
     * Low level utility to create a localized instance of moment.
     * Do not use outside this module
     * @param  {Object} date     Date to format
     * @return {moment}
     */
    localize: (date) => localize(date),
  };
};

/**
 * Inject translations function into props of a wrapper component.
 * @param  {Component} WrappedComponent   Wrapper component
 * @return {Component}                    Decorated component
 */
const withTranslator = (options: WithTranslatorOptions|void) => (WrappedComponent) => {
  const defaultOptions: WithTranslatorOptions = {
    propsNamespace: '',
  };

  const finalOptions: WithTranslatorFinalOptions = { ...defaultOptions, ...options };

  class WithTranslator extends React.Component {
    static displayName =
      `WithTranslator(${getDisplayName(WrappedComponent)})`;

    static propTypes = {
      res: PropTypes.object,
    };

    static contextTypes = {
      translator: translatorType,
    };

    static WrappedComponent = WrappedComponent;

    componentWillMount() {
      // Handle first render, for which componentWillReceiveProps has not been called
      this.updateI18NProps(this.context);
    }

    componentWillReceiveProps(nextProps, nextContext) {
      const toUpdate = !shallowEqual(this.context.translator, nextContext.translator);
      if (toUpdate) {
        this.updateI18NProps(nextContext);
      }
    }

    i18nProps = {};

    updateI18NProps(context) {
      this.i18nProps = createTranslatorProps(context.translator);
    }

    render() {
      const finalProps = getProps(this.props, this.i18nProps, finalOptions.propsNamespace);
      return <WrappedComponent {...finalProps} />;
    }
  }

  const HoistedComponent = hoistNonReactStatic(WithTranslator, WrappedComponent);
  HoistedComponent.preFetch = function preFetch(props) {
    const { res: { locals: { translator } } } = props;
    const i18nProps = createTranslatorProps(translator);

    // Call child preFetch if any
    const wrappedPreFetch = getDataDependency(WrappedComponent, 'preFetch');
    if (!wrappedPreFetch) {
      return null;
    }

    const wrapperComponentProps = getProps(props, i18nProps, finalOptions.propsNamespace);

    return wrappedPreFetch(wrapperComponentProps);
  };

  return HoistedComponent;
};

export { withTranslator, createTranslatorProps };
