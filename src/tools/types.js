/* eslint import/prefer-default-export: 0 */

// @flow

// Very incomplete, this is a first draft of types annotations...
export type Translator = {
  translator: Object,
  translate: Function,
  localize: Function,
  createNumberFormat: Function,
  mapCurrencyISOToSymbol: Function,
};

export type Locale = string;
