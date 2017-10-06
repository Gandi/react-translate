/**
 * Date component for date translations.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withTranslator } from './withTranslator';


@withTranslator({ propsNamespace: 'translator' })
class DateTime extends React.Component {
  static propTypes = {
    // imported by @withTranslator
    translator: PropTypes.object,
    // user attributes
    format: PropTypes.string,
    children: PropTypes.any.isRequired,
  };

  render() {
    const {
      translator, format, children, ...extraProps
    } = this.props;

    return (
      <time {...extraProps} dateTime={translator.formatDate(children, '')}>
        {translator.formatDate(children, format)}
      </time>
    );
  }
}

export default DateTime;
