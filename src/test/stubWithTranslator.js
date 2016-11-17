import stubProvideTranslate from './stubProvideTranslate';
import { withTranslator } from '../react/withTranslator';


/**
 * Stub @withTranslator on `DummyComponent` and return a new decorated
 * component.
 *
 * Usage:
 *
 * const App = stubWithTranslator({
 *   translations: {
 *     'This is a test %(username)s!': 'C\'est un test %(username)s!',
 *   },
 *   locale: 'fr',
 *   logMissing: true,
 * })(DummyComponent);
 *
 */

const stubWithTranslator = (translArgs = {}) => (WrappedComponent) => {
  if (typeof translArgs === 'string') {
    throw new Error(
      'DEPRECATION ERROR:\n' +
      'stubProvideTranslate(namespace, translArgs)\n' +
      'namespace parameter is deprecated.\n' +
      'Use stubProvideTranslate(translArgs { scope, ...args }) instead.'
    );
  }

  const { propsNamespace, ...args } = translArgs;
  const CompWTranslator = withTranslator({ propsNamespace })(WrappedComponent);

  return stubProvideTranslate(args)(CompWTranslator);
};
export default stubWithTranslator;
