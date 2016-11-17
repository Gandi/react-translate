FormatCurrency
==============

Basic Usage
-----------

`formatCurrency` is provided through the `withTranslator` decorator:

```javascript
import React, { Component, PropTypes } from 'react';
import { withTranslator } from '@gandi/react-translate';

@withTranslator()
class MyComponent extends Component {
  static propTypes = {
    formatCurrency: PropTypes.func.isRequired,
  };

  render() {
    const { formatCurrency } = this.props;
    return (<span>{ formatCurrency('EUR') }</span>);
  }
}
```

### Components

`@gandi/react-translate` comes with a component to display money related data:

> This is not done yet, but feel free to implement ;)

- `<CurrencySymbol />`

``` javascript
import React, { Component } from 'react';
import { CurrencySymbol } from '@gandi/react-translate';

class MyComponent extends Component {
  render() {
    return (
      <div>
        <p>This is valid calls</p>
        <ul>
          <li>Default: <CurrencySymbol>USD</CurrencySymbol></li>
        </ul>
      </div>
    );
  }
}
```
