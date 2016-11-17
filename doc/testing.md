Testing
=======

There is 2 use cases when testing I18n components:

- the component expects I18n stuff as props
- the component is standalone and use `@withTranslator` internally

### Component Expect Properties

```javascript
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { stubWithTranslator } from '@gandi/react-translate/dist/test';

import RawMyAwesomeComponent from './MyAwesomeComponent';

describe('<MyAwesomeComponent />', () => {
  const MyAwesomeComponent = stubWithTranslator({
    translations: {
      namespace: {
        'This is a test %(username)s!': 'C\'est un test %(username)s!',
        // Use plural forms
        'x_domain|zero': 'Aucun domaine',
        'x_domain|one': 'Un domaine',
        'x_domain|other': '%(count)s domaines',
      },
    },
    locale: 'fr',
    logMissing: true,
    scope: 'namespace',
    propsNamespace: 'translator',
  })(RawMyAwesomeComponent);

  it('should render', () => {
    const wrapper = mount(<MyAwesomeComponent />);

    expect(wrapper).to.be.present();
  });
});
```

### Component Decorated With `@withTranslator`

```javascript
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { stubProvideTranslate } from '@gandi/react-translate/dist/test';

import RawMyAwesomeComponent from './MyAwesomeComponent';

describe('<MyAwesomeComponent />', () => {
  const MyAwesomeComponent = stubProvideTranslate({
    translations: {
      namespace: {
        'This is a test %(username)s!': 'C\'est un test %(username)s!',
        // Use plural forms
        'x_domain|zero': 'Aucun domaine',
        'x_domain|one': 'Un domaine',
        'x_domain|other': '%(count)s domaines',
      },
    },
    locale: 'fr',
    logMissing: true,
  })(RawMyAwesomeComponent);

  it('should render', () => {
    const wrapper = mount(<MyAwesomeComponent />);

    expect(wrapper).to.be.present();
  });
});
```

### Shallow Rendering

Shallow rendering prevent usage off decorator.

We got you covered with `withTranslatorProps`:

``` javascript
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { withTranslatorProps } from '@gandi/react-translate/dist/test';

describe('<MyAwesomeComponent />', () => {
  it('should render', () => {
    const wrapper = shallow(<MyAwesomeComponent {...withTranslatorProps()} />);
    expect(wrapper).to.not.be.blank();
  });

  it('should render with i18n', () => {
    const wrapper = shallow(
      <MyAwesomeComponent
        {...withTranslatorProps({
          translations: { foo: 'bar' },
          utcOffset: 3,
        })} />
    );
    expect(wrapper).to.contain.text('bar');
  });

  it('should render with i18n scope', () => {
    const wrapper = shallow(
      <MyAwesomeComponent
        {...withTranslatorProps({
          translations: { scope: { foo: 'bar' } },
          utcOffset: 3,
        }, 'scope')} />
    );
    expect(wrapper).to.contain.test('bar');
  });
});
```
