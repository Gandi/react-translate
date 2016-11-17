import React, { PropTypes, Component } from 'react';
import { withTranslator } from './withTranslator';


@withTranslator({ propsNamespace: 'translator' })
class FromNow extends Component {
  static propTypes = {
    // imported by @withTranslator
    translator: PropTypes.object,
    // user attributes
    children: PropTypes.any.isRequired,
    from: PropTypes.any,
  };

  render() {
    const {
      translator, from, children, ...extraProps
    } = this.props;

    return (
      <time {...extraProps} dateTime={translator.formatDate(children, 'LLLL')}>
        {translator.localize(children).from(from || Date.now())}
      </time>
    );
  }
}

export default FromNow;
