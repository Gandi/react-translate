# @gandi/react-translate [![build status][@gandi/react-translate-tests]][@gandi/react-translate-tests-url]

[@gandi/react-translate-tests-url]: FIXME
[@gandi/react-translate-tests]: FIXME

I18N libraries and tools for your react application.

**Features:**

* String localization with [counterpart](https://github.com/martinandert/counterpart)
* messages extraction
* Catalogs management (similar to [gettext](https://en.wikipedia.org/wiki/Gettext))
* Date & Time formats with [momentjs](http://momentjs.com/)
* Prices and number format with [intljs](https://github.com/andyearnshaw/Intl.js)
* several components & functions

## Installation

```
npm install --save @gandi/react-translate
```

## Usage

### 1. init: `provideTranslate`

Provide some helpers functions in the React context.

It's up to you to load `translations` from the json generated by scripts (cf.
[How to create language files]). So you will be able to promise a json object or preload translations
directly in the DOM (e.g. via server side rendering).

```javascript
import { provideTranslate, createTranslator } from '@gandi/react-translate';

const translatorParams = {
  translations: {       // catalog
    'This is a test %(username)s!': 'C\'est un test %(username)s!',
  },
  locale: 'fr',         // user's locale
  utcOffset: 0,         // user's zone offset
  defaultLocale: 'en',  // default application locale
  logMissing: false,    // display warnings when translations are missing (except on production)
  localeData: {         // Config for TODO
    locale: 'fr',
    number: {
      currencies: {
        USD: '$US',
        EUR: '€',
      },
    },
  },
};

const translator = createTranslator(translatorParams);

@provideTranslate(translator)
class App {
  render() {
    ...
  }
}
```

### 2. Implementation: `withTranslator(options)`

Inject helpers into the components props from context variables.

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

Options:

```js
{
  propsNamespace: 'translator', // injected props will be set in props.translator
}
```

**Note About Namespaces**

You can set a namespace if you need it on some translations with [the counterpart scope
parameter](https://github.com/martinandert/counterpart#lookup):

```
__('string', { scope: 'my.scope' })
```

_Moreover, current extraction mechanism has no way to extract namespace from
JavaScript, it is your responsibility to pass it to the extract script._

## 3. Create language files

**Prerequisite:**

You need [the extracting tool `pybabel`](http://babel.pocoo.org/en/latest/) (launch extract_messages for installation help), you need `babel-cli` and the preset used by your app and also `po2json`.

For example, first create the file `pybabel.cfg` with the following content:

```
[javascript: **.js]
encoding = utf-8
extract_messages = __
```

Then if you created your app with create-react-app and using a debian like OS, you can do the following setup:

```bash
# pybabel installation
sudo apt-get install python-pybabel
# force dependencies (OK we need to make this easier)
npm i babel-cli babel-preset-react-app po2json
# force the preset for babel
cat <<EOF > .babelrc
{
  "presets": ["react-app"]
}
END
```

### Message files

First create a template message file with all the translation strings in a json:

```bash
node_modules/.bin/extract_messages [folder/to/extract] [filename]
```

_(All commands are launched from the root directory of your node project.)_

### Catalogs

A catalog file is a json file, representing a single language.

After you created your message file – **and each time you make changes to it** – you’ll need to
create or update the catalogs:

```bash
node_modules/.bin/create_catalog && node_modules/.bin/update_catalog
```

Sometimes you must clean the catalogs by running this command:

```bash
node_modules/.bin/clean_catalog
```

> Tips: In case you use a tool like weblate, you may not clean every time you are extracting
> messages or updating catalogs to avoid losing old translations that could be used by the tool to
> suggest translations.

## Documentations

- [Translator (aka `__`)](doc/translator.md)
- [Date/Time (aka `localize`)](doc/localize.md)
- [Pricing (aka prize)](doc/prize.md)
- [formatCurrency (aka MapCurrencyISOToSymbol)](doc/formatCurrency.md)
- [Number formatting (aka formatNumber)](doc/formatNumber.md)

## Tests

More in [testing documentation](doc/testing.md).

You have various ways to stub your translator.

```javascript
import { createTranslateContext, createTranslateContextTypes }
  from '@gandi/react-translate/dist/test';

describe('...', () => {
  it('...', () => {
    const wrapper =  mount(<Component />, {
      context: createTranslateContext(),
      childContextTypes: createTranslateContextTypes(),
    });
  });
});
```

```javascript
import { stubProvideTranslate } from '@gandi/react-translate/dist/test';

describe('LocalLoader component', () => {
  it('should render a spinner', () => {
    const LocalLoader_ = stubProvideTranslate({ locale: 'fr' })(LocalLoader);
    // ...
  });
});
```

## Components examples

`@gandi/react-translate` comes bundled wit some components:

```jsx
<div>
  <DateTime>1982-03-28 12:00:00 UTC</DateTime>
  <FromNow>1982-03-28 12:00:00 UTC</FromNow>
</div>
```

To use localization programmatically, just do:

```javascript
import React, { Component, PropTypes } from 'react';
import { withTranslator } from '@gandi/react-translate';

@withTranslator()
class MyComponent extends Component {
  static propTypes = {
    localize: PropTypes.func.isRequired,
  };

  static preFetch({ localize }) {
    console.log(localize(new Date()).format('LLLL'));
  }

  render() {
    const { localize } = this.props;
    return (<div>{ localize(new Date()).format('LLLL') }</div>);
  }
}
```

## Changelog

All notable changes to this project will be documented in [this section](CHANGELOG.md).

*This project adheres to [Semantic Versioning](http://semver.org/) and [Keep A Changelog](http://keepachangelog.com/).*


## Found a bug or contribute?

Please open an [issue](https://github.com/Gandi/react-translate/issues). If it's clear and well
labelized, it's quicker to fix!

Else you can start with [CONTRIBUTING.md](CONTRIBUTING.md).

## TODO

* document `Pricing` features
* add formatCurrency component
* extract babeljs compilation process from extract_messages script (CRA compatible)
* add a script launcher and remove usage of `node_modules/.bin/bla-thing` from docs (cf. CRA)
* improve doc on how to load translations (at least give an example)
* link translator options to related libs
* remove required pybabel.cfg
* allow user to init a logger for missing translations and use `warning` as fallback
* fix or change build process in `bin/merge_catalogs` which looks for legacy gandi's catalogs
* replace pybabel by a npm script (eg. https://www.npmjs.com/package/babel-gettext-extractor)
* fix dependency path for scripts called in extract_messages (e.g. po2json)

## Final though

This project is supported by [Gandi.net](https://gandi.net) (#no_bullshit)
