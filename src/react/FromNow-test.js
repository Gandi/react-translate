import React from 'react';
import { expect } from 'chai';
import { render } from 'enzyme';
import sinon from 'sinon';

import { default as FromNowOriginal } from './FromNow';
import { stubProvideTranslate } from '../test';


global.__DEV__ = true;
global.__SERVER__ = true;

describe('<FromNow />', () => {
  let clock;
  beforeEach(() => (
    clock = sinon.useFakeTimers(Date.parse('2016-03-28 08:00:00 UTC'))
  ));
  afterEach(() => clock.restore());

  const FromNow = stubProvideTranslate({
    locale: 'fr',
  })(FromNowOriginal);

  it('should render future time', () => {
    const wrapper = render(<FromNow children="2016-03-28 09:00:00" />);
    const expected = 'dans une heure';

    expect(wrapper).to.contain.text(expected);
  });

  it('should render past time', () => {
    const wrapper = render(<FromNow children="2016-03-28 07:00:00" />);
    const expected = 'il y a une heure';

    expect(wrapper).to.contain.text(expected);
  });
});
