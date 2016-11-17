Translator (aka `__`)
=====================

Basic Usage
-----------

Translator is provided through the `withTranslator` decorator:

```javascript
import React, { Component, PropTypes } from 'react';
import { withTranslator } from '@gandi/react-translate';

@withTranslator()
class MyComponent extends Component {
  static propTypes = {
    __: PropTypes.func.isRequired,
  };

  static preFetch({ __ }) {
    console.log(__('So i18n'));
  }

  render() {
    const { __ } = this.props;
    return (<div>{ __('So i18n') }</div>);
  }
}
```

Avanced Usage
-------------

The following options are available:

- `withHTML` returns an object compatible with `dangerouslySetInnerHTML`;
- `escapeParameters` force the parameter html escaping (automatically turned on
  by `withHTML`);
- `fallback` the fallback to use if translation is not found (see [counterpart
  doc](https://github.com/martinandert/counterpart#fallbacks)).

### Use Variables

``` javascript
import React, { Component, PropTypes } from 'react';
import { withTranslator } from '@gandi/react-translate';

@withTranslator()
class MyComponent extends Component {
  static propTypes = {
    __: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
  };

  render() {
    const { __, name } = this.props;
    return (
      <div>
        { __('Hello %(name)s', { name }) }
      </div>
    );
  }
}
```

### Do Not Escape HTML

``` javascript
import React, { Component, PropTypes } from 'react';
import { withTranslator } from '@gandi/react-translate';

@withTranslator()
class MyComponent extends Component {
  static propTypes = {
    __: PropTypes.func.isRequired,
  };

  render() {
    const { __ } = this.props;
    return (
      <div dangerouslySetInnerHTML={
        __('So <i>i18n</i>', { withHTML: true })
      } />
    );
  }
}
```

By default, all parameters are escaped, but, if you are **sure the parameters
are not provided by the user** you can use raw parameters:

``` javascript
import React, { Component, PropTypes } from 'react';
import { withTranslator } from '@gandi/react-translate';

@withTranslator()
class MyComponent extends Component {
  static propTypes = {
    __: PropTypes.func.isRequired,
  };

  render() {
    const { __ } = this.props;
    return (
      <div dangerouslySetInnerHTML={
        __('So %(someSafeString)s and %(someReactComponent)s', {
          someSafeString: '<i>i18n</i>',
          someReactComponent: <Text>Hello Man</Text>

          withHTML: true,
          escapeParameters: false,
        })
      } />
    );
  }
}
```

### Plural Forms

It is possible to use different translations depending on a number.

The variable **MUST** be named `count` to activate [Counterpart
pluralization](https://github.com/martinandert/counterpart#pluralization).


```javascript
import React, { Component, PropTypes } from 'react';
import { withTranslator } from '@gandi/react-translate';

@withTranslator()
class MyComponent extends Component {
  static propTypes = {
    __: PropTypes.func.isRequired,
  };

  static preFetch({ __ }) {
    console.log(__('So i18n'));
  }

  render() {
    const { __, domains } = this.props;
    return (<div>{ __('%(count)s domains', { count: domains.length }) }</div>);
  }
}
```

> Note that the pluralization is applied by `bin/create_counterpart_plurals`
> script, only if the translation string contains `%(count)s`.

> Note Weblate expects flat files, compatible with po format, so each
> pluralizable key is expanded into 3 keys:
>
> * `%(count)s domains|zero`
> * `%(count)s domains|one`
> * `%(count)s domains|other`
