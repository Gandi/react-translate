import React, { Component, PropTypes } from 'react';
import { withTranslator } from '@gandi/react-translate';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    const { translator: { __, formatPrice, formatDate } } = this.props;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>{__('Welcome!')}</h2>
        </div>

        <p
          className="App-intro"
          dangerouslySetInnerHTML={__('Get started!', { withHTML: true })}
        />

        <ul className="Sample">
          <li>{__('A price sample')}: {formatPrice(20, 'EUR')}</li>
          <li>{__('A date sample')}: {formatDate(Date.now(), 'LL')}</li>
        </ul>

        <p className="Links">
          <a href="?lang=fr">{__('Switch to French')}</a>
          <a href="?lang=en">{__('Switch to English')}</a>
        </p>
      </div>
    );
  }
}

App.propTypes = {
  translator: PropTypes.object.isRequired,
};

// decorate your app with withTranslator to inject the helpers
// into the component 'propsNamespace' prop
export default withTranslator({
  propsNamespace: 'translator',
})(App);
