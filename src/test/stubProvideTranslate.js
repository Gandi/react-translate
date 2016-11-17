/* eslint no-param-reassign: 0 */
/* eslint react/sort-comp: 0 */

/**
 * Stub to decorate a component with translators props.
 *
 * Usage:
 *
 * import { stubProvideTranslate } from 'gandi.translate/dist/tests/stubProvideTranslate';
 *
 * describe('#DateTime component', () => {
 *   const DateTime_ = stubProvideTranslate({
 *     locale: 'fr',
 *   })(DateTime);
 *
 *   it('should render a date', () => {
 *     const wrapper = mount(<DateTime_>2016-03-29T14:30:45Z</DateTime_>);
 *     expect(wrapper.html()).to.equal(
 *       '<time datetime="2016-03-29T14:30:45+00:00">29 mars 2016 14:30 +00:00</time>'
 *     );
 *   });
 * });
 *
 */

import createTranslator from '../tools/createTranslator';
import fixWeblateFormat from '../tools/fixWeblateFormat';
import provideTranslate from '../react/provideTranslate';


const stubProvideTranslate = (stubArgs = {}, defaultScope) => (WrappedComponent) => {
  if (defaultScope) {
    throw new Error(
      'DEPRECATION ERROR:\n' +
      'stubProvideTranslate(stubArgs, defaultScope)\n' +
      'defaultScope parameter is deprecated.\n' +
      'Use stubArgs { scope, ...args } instead.'
    );
  }

  const translatorArgs = {
    translations: {},
    locale: 'en',
    utcOffset: 0,
    defaultLocale: 'en',
    logMissing: false,
    ...stubArgs,
  };

  // Stub accept the weblate format for translations, let's transform
  translatorArgs.translations = fixWeblateFormat(translatorArgs.translations);

  const translator = createTranslator(translatorArgs);

  return provideTranslate(translator)(WrappedComponent);
};
export default stubProvideTranslate;
