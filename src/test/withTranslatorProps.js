// @flow
/**
 * Create translator properties.
 *
 * This is useful to test a component with shallow rendering for instance.
 *
 * ``` javascript
 * import React from 'react';
 * import { expect } from 'chai';
 * import { shallow } from 'enzyme';
 * import { withTranslatorProps } from 'gandi.translate/dist/test';
 *
 * describe('<MyAwesomeComponent />', () => {
 *   it('should render', () => {
 *     const wrapper = shallow(<MyAwesomeComponent {...withTranslatorProps()} />);
 *     expect(wrapper).to.not.be.blank();
 *   });
 *
 *   it('should render with i18n', () => {
 *     const wrapper = shallow(
 *       <MyAwesomeComponent
 *         {...withTranslatorProps({
 *           translations: { foo: 'bar' },
 *           utcOffset: 3,
 *         })} />
 *     );
 *     expect(wrapper).to.contain.text('bar');
 *   });
 *
 *   it('should render with i18n scope', () => {
 *     const wrapper = shallow(
 *       <MyAwesomeComponent
 *         {...withTranslatorProps({
 *           translations: { scope: { foo: 'bar' } },
 *           utcOffset: 3,
 *         }, 'scope')} />
 *     );
 *     expect(wrapper).to.contain.test('bar');
 *   });
 * });
 * ```
 */
import createTranslator from '../tools/createTranslator';
import fixWeblateFormat from '../tools/fixWeblateFormat';
import { createTranslatorProps } from '../react/withTranslator';


export default (args: Object = {}) => {
  const translatorArgs = {
    translations: {},
    locale: 'en',
    utcOffset: 0,
    defaultLocale: 'en',
    logMissing: false,
    ...args,
  };

  // Stub accept the weblate format for translations, let's transform
  translatorArgs.translations = fixWeblateFormat(translatorArgs.translations);

  return createTranslatorProps(createTranslator(translatorArgs));
};

