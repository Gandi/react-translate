formatNumber
============

Basic Usage
-----------

`formatNumber` is provided through the `withTranslator` decorator:

```javascript
import React, { Component, PropTypes } from 'react';
import { withTranslator } from '@gandi/react-translate';

@withTranslator()
class MyComponent extends Component {
  static propTypes = {
    formatNumber: PropTypes.func.isRequired,
  };

  render() {
    const { formatNumber } = this.props;
    const precision = 2;
    return (<span>{ formatNumber(3.141592, precision) }</span>);
  }
}
```

### Components

`@gandi/react-translate` comes with a component to display numbers:

- `<FormatNumber />`

``` javascript
import React, { Component } from 'react';
import { FormatNumber } from '@gandi/react-translate';

class MyComponent extends Component {
  render() {
    const number = 10.45679;
    return (
      <div>
        <p>This is valid calls</p>
        <ul>
          <li>Default: <FormatNumber>{number}</FormatNumber></li>
          <li>Force precision: <FormatNumber precision={2}>{number}</FormatNumber></li>
        </ul>
      </div>
    );
  }
}
```
