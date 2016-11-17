import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { withTranslatorProps } from './';


describe('withTranslatorProps', () => {
  class MyAwesomeComponent extends React.Component {
    static propTypes = {
      __: React.PropTypes.func.isRequired,
      formatDate: React.PropTypes.func.isRequired,
      formatPrice: React.PropTypes.func.isRequired,
      localize: React.PropTypes.func.isRequired,
      value: React.PropTypes.string,
    };

    render() {
      return <p>{this.props.__('foo %(value)s', { value: this.props.value })}</p>;
    }
  }

  it('should render', () => {
    const wrapper = shallow(<MyAwesomeComponent {...withTranslatorProps()} value="3" />);
    expect(wrapper).to.contain.text('foo 3');
  });

  it('should render with i18n', () => {
    const wrapper = shallow(
      <MyAwesomeComponent
        {...withTranslatorProps({
          translations: { 'foo %(value)s': 'bar %(value)s' },
          utcOffset: 3,
        })}
        value="3"
      />
    );
    expect(wrapper).to.contain.text('bar 3');
  });

  it('should render with i18n scope', () => {
    const wrapper = shallow(
      <MyAwesomeComponent
        {...withTranslatorProps({
          translations: { scope: { 'foo %(value)s': 'bar %(value)s' } },
          utcOffset: 3,
          scope: 'scope',
        })}
        value="3"
      />
    );
    expect(wrapper).to.contain.text('bar 3');
  });
});
