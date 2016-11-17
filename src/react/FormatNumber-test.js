import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import { default as RawFormatNumber } from './FormatNumber';
import { stubProvideTranslate } from '../test';


global.__SERVER__ = true;   // to import locales polyfill
global.__DEV__ = true;

describe('FormatNumber component', () => {
  // this test is slow (~ 200ms) because it loads the polyfill
  it('should render an int by default', () => {
    const FormatNumber = stubProvideTranslate({
      locale: 'fr',
    })(RawFormatNumber);

    const wrapper = mount(<FormatNumber>42</FormatNumber>);
    expect(wrapper.html()).to.equal('<span>42</span>');
  });

  it('should render an int', () => {
    const FormatNumber = stubProvideTranslate({
      locale: 'fr',
    })(RawFormatNumber);

    const wrapper = mount(<FormatNumber precision={0}>42</FormatNumber>);
    expect(wrapper.html()).to.equal('<span>42</span>');
  });

  it('should render an int from a float', () => {
    const FormatNumber = stubProvideTranslate({
      locale: 'fr',
    })(RawFormatNumber);

    const wrapper = mount(<FormatNumber precision={0}>3.1415</FormatNumber>);
    expect(wrapper.html()).to.equal('<span>3</span>');
  });

  it('should render a decimal', () => {
    const FormatNumber = stubProvideTranslate({
      locale: 'fr',
    })(RawFormatNumber);

    const wrapper = mount(<FormatNumber precision={2}>42</FormatNumber>);
    expect(wrapper.html()).to.equal('<span>42,00</span>');
  });

  it('should render decimal, en', () => {
    const FormatNumber = stubProvideTranslate({
      locale: 'en',
    })(RawFormatNumber);

    const wrapper = mount(<FormatNumber precision={2}>42</FormatNumber>);
    expect(wrapper.html()).to.equal('<span>42.00</span>');
  });

  it('should render decimal from float, en', () => {
    const FormatNumber = stubProvideTranslate({
      locale: 'en',
    })(RawFormatNumber);

    const wrapper = mount(<FormatNumber precision={2}>3.1415</FormatNumber>);
    expect(wrapper.html()).to.equal('<span>3.14</span>');
  });
});
