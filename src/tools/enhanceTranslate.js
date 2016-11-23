import React from 'react';
import ReactDOM from 'react-dom/server';

// Used to map characters to HTML entities.
const htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

const accessor = object => key => object[key];
const unescapeHTMLCharReplacer = accessor(htmlEscapes);

const reUnescapedHtml = /[&<>"']/g;
const reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

const escape = (string) => {
  if (string && reHasUnescapedHtml.test(string)) {
    return string.replace(reUnescapedHtml, unescapeHTMLCharReplacer);
  }

  return string;
};

const componentToString = (key, elt) => {
  if (!React.isValidElement(elt)) return elt;

  try {
    return ReactDOM.renderToStaticMarkup(elt);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`In gandi.translate, unable to render component ${key}`, err);
    return elt;
  }
};

export default function enhanceTranslate(namespace, translate) {
  /**
  * Wrap Counterpart translate function for more features.
  * @param  {String} message   Message to translate
  * @param  {Object} options   Options for the translation
  * @return {String}           Translated string
  */
  function enhancedTranslate(message, options = {}) {
    let parsedOptions = {
      withHTML: false,
      escapeParameters: false,
      scope: namespace,
      fallback: message,
      ...options,
    };

    // Resolve React components to static markup if needed
    parsedOptions = Object.keys(parsedOptions)
      .reduce((acc, key) => ({
        ...acc,
        [key]: componentToString(key, parsedOptions[key]),
      }), {});

    // Due to legacy, `withHTML` implicitly turns on parameter escaping.
    if ('withHTML' in options && !('escapeParameters' in options)) {
      parsedOptions.escapeParameters = options.withHTML;
    }

    if (parsedOptions.escapeParameters) {
      parsedOptions = Object.keys(parsedOptions)
        .reduce((acc, key) => {
          const value = parsedOptions[key];
          const shouldEscape = typeof value === 'string'
            && ['scope', 'fallback'].indexOf(key) === -1;

          return {
            ...acc,
            [key]: shouldEscape ? escape(value) : value,
          };
        }, {});
    }

    if (options.withHTML) {
      // wrap for dangerouslySetInnerHTML parameter
      return { __html: translate(message, parsedOptions) };
    }

    return translate(message, parsedOptions);
  }

  return enhancedTranslate;
}
