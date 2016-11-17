/**
 * Price component for prices translations.
 */

import React, { PropTypes } from 'react';
import { withTranslator } from './withTranslator';


@withTranslator({ propsNamespace: 'translator' })
class Price extends React.Component {
  static propTypes = {
    // imported by @withTranslator
    translator: PropTypes.object,
    // user attributes
    currency: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired,
  };

  render() {
    const {
      translator, currency, children, ...extraProps
    } = this.props;

    return <span {...extraProps}>{translator.formatPrice(children, currency)}</span>;
  }
}

export default Price;
