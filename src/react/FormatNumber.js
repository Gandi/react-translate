import React, { PropTypes, Component } from 'react';
import { withTranslator } from './withTranslator';


@withTranslator({ propsNamespace: 'translator' })
/**
 * FormatNumber component
 */
class FormatNumber extends Component {
  static propTypes = {
    // imported by @withTranslator
    translator: PropTypes.object,
    // user attributes
    precision: PropTypes.number,
    children: PropTypes.any.isRequired,
  };

  /**
   * Render component
   * @return {ReactElement}
   */
  render() {
    const {
      translator, precision, children, ...extraProps
    } = this.props;

    return (
      <span {...extraProps}>{translator.formatNumber(children, {
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
      })}</span>
    );
  }
}

export default FormatNumber;
