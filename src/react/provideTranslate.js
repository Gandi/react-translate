/* eslint no-param-reassign: 0 */

import React from 'react';
import { getDataDependency, getDisplayName } from './component-helper';

import translatorType from './translatorType';


/**
 * Provide the translator for the whole application.
 * @param Object translator           Translator object
 * @param Component WrappedComponent  A wrapper component
 * @return Component
 */
const provideTranslate = (translator) =>
  (WrappedComponent) =>
    class ProviderTranslate extends React.Component {
      static childContextTypes = {
        translator: translatorType,
      };

      /**
       * `translator` is an object with functions declared in
       * `childContextTypes`.
       */
      getChildContext() {
        return { translator };
      }

      static WrappedComponent = WrappedComponent;
      static displayName =
        `ProviderTranslate(${getDisplayName(WrappedComponent)})`;

      static preFetch(props) {
        props.res.locals = {
          ...props.res.locals,
          translator,
        };

        // Call child preFetch if any
        const wrappedPreFetch = getDataDependency(WrappedComponent, 'preFetch');
        if (!wrappedPreFetch) {
          return Promise.resolve();
        }
        return wrappedPreFetch(props);
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
    };

export default provideTranslate;
