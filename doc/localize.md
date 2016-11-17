Date/Time (aka `localize`)
==========================

Basic Usage
-----------

Localization methods are provided through the `withTranslator` decorator:

### `localize` And `formatDate` Methods

`localize` function provide a [momentjs](http://momentjs.com/) instance
localized in the user current timezone and language.

`formatDate` is a shortcut to `localize(date).format(format)` with a default
format.

> Note: the current timezone means you do not need to to worry about it, it is
> negotiated from different input sources.
>
> This can cause some reconciliation problems on first rendering server side.

```javascript
import React, { Component, PropTypes } from 'react';
import { withTranslator } from '@gandi/react-translate';

@withTranslator()
class MyComponent extends Component {
  static propTypes = {
    localize: PropTypes.func.isRequired,
    formatDate: PropTypes.func.isRequired,
  };

  static preFetch({ localize }) {
    console.log(localize(new Date()).calendar());
  }

  render() {
    const { localize, formatDate } = this.props;
    return (
      <div>
        <p>This is valid calls</p>
        <ul>
          <li>{ localize(new Date()).format('LLLL') }</li>
          <li>{ formatDate(new Date()) }</li>
          <li>{ formatDate(new Date(), 'YYYYMMDD') }</li>
        </ul>
      </div>
    );
  }
}
```

### Components

`@gandi/react-translate` comes with some handy components to display dates:

- `<DateTime />`
- `<FromNow />`

``` javascript
import React, { Component } from 'react';

class MyComponent extends Component {
  render() {
    const date = new Date('2016-05-03T15:43:33');
    return (
      <div>
        <p>This is valid calls</p>
        <ul>
          <li>Default format: <DateTime>{date}</DateTime></li>
          <li>Force format: <DateTime format="LLL">{date}</DateTime></li>
          <li><FromNow>{date}</FromNow></li>
          <li>From another date: <FromNow from={new Date()}>{date}</FromNow></li>
        </ul>
      </div>
    );
  }
}
```
