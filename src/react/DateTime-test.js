import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import { default as RawDateTime } from './DateTime';
import { stubProvideTranslate } from '../test';


global.__DEV__ = true;

describe('DateTime component', () => {
  it('should render a date in french', () => {
    const DateTime = stubProvideTranslate({
      locale: 'fr',
    })(RawDateTime);

    const wrapper = mount(<DateTime>2016-03-29T14:30:45Z</DateTime>);
    expect(wrapper.html()).to.equal(
      '<time datetime="2016-03-29T14:30:45Z">29 mars 2016 14:30 +00:00</time>'
    );
  });

  it('should render a date in spanish', () => {
    const DateTime = stubProvideTranslate({
      locale: 'es',
    })(RawDateTime);

    const wrapper = mount(<DateTime>2016-03-29T14:30:45Z</DateTime>);
    expect(wrapper.html()).to.equal(
      '<time datetime="2016-03-29T14:30:45Z">29 de marzo de 2016 14:30 +00:00</time>'
    );
  });

  it('should render a date with a custom format', () => {
    const DateTime = stubProvideTranslate({
      locale: 'fr',
    })(RawDateTime);

    const wrapper = mount(<DateTime format="L">2016-03-29T14:30:45Z</DateTime>);
    expect(wrapper.html()).to.equal(
      '<time datetime="2016-03-29T14:30:45Z">29/03/2016</time>'
    );
  });

  it('should consider that all dates are UTC', () => {
    const DateTime = stubProvideTranslate({
      locale: 'fr',
    })(RawDateTime);

    const wrapper = mount(<DateTime format="LLL Z">2016-03-29 14:30:00</DateTime>);
    expect(wrapper.html()).to.equal(
      '<time datetime="2016-03-29T14:30:00Z">29 mars 2016 14:30 +00:00</time>'
    );
  });
});
