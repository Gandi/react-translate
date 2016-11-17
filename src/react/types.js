// @flow

/* Utility function types */

export type TranslatorFunctionOptions = {
  withHTML?: boolean,
  escapeParameters?: boolean,
  scope?: string,
  fallback?: string,
};

/* Decorator types */

export type WithTranslatorOptions = {
  propsNamespace?: string,
};

export type WithTranslatorFinalOptions = {
  propsNamespace: string,
};

/* Components types */

export type TranslatorComponentProps = {
  __: (message: string, options?: TranslatorFunctionOptions) => string,
  formatDate: (date: string, format?: string) => string,
  formatPrice: (price: string | number, currency?: string) => string,
  formatCurrency: (currencyISO: string) => string,
  localize: (date: string | Date) => string,
};
