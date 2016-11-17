import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import { default as RawPrice } from './Price';
import { stubProvideTranslate } from '../test';


global.__SERVER__ = true;   // to import locales polyfill
global.__DEV__ = true;

describe('Price component', () => {
  // this test is slow (~ 200ms) because it loads the polyfill
  it('should render a price in EUR, fr', () => {
    const Price = stubProvideTranslate({
      locale: 'fr',
    })(RawPrice);

    const wrapper = mount(<Price currency="EUR">42</Price>);
    expect(wrapper.html()).to.equal('<span>42,00&nbsp;€</span>');
  });

  it('should render a price in USD, en', () => {
    const Price = stubProvideTranslate({
      locale: 'en',
    })(RawPrice);

    const wrapper = mount(<Price currency="USD">42</Price>);
    expect(wrapper.html()).to.equal('<span>$42.00</span>');
  });
});
