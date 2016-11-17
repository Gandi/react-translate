import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import createTranslator from '../tools/createTranslator';
import provideTranslate from './provideTranslate';
import translatorType from './translatorType';


global.__DEV__ = true;
global.__SERVER__ = true;


describe('@provideTranslate', () => {
  const translatorParams = {
    translations: {
      'Hello World!': 'Salut tout le monde!',
      namespace: {
        'Hello World!': 'Salut à vous!',
      },
    },
    locale: 'fr',
    utcOffset: 0,
    defaultLocale: 'en',
    logMissing: false,
    localeData: {
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

  class DummyComponent extends React.Component {
    static contextTypes = {
      translator: translatorType.isRequired,
    };

    static preFetch(props) {
      return props;
    }

    render() {
      const {
        translate, localize, createNumberFormat, mapCurrencyISOToSymbol,
      } = this.context.translator;

      return (
        <div>
          <span>{translate('Hello World!')}</span>
          <span>{localize('2016-03-29T14:30:45Z').format('LLL Z')}</span>
          <span>{createNumberFormat({ style: 'currency', currency: 'EUR' }).format(42)}</span>
          <span>{mapCurrencyISOToSymbol('EUR')}</span>
        </div>
      );
    }
  }

  describe('without default Namespace', () => {
    const DecoratedDummyComponent = provideTranslate(translator)(DummyComponent);

    it('should render and display all translations', () => {
      const wrapper = mount(<DecoratedDummyComponent />);
      expect(wrapper.childAt(0).text()).to.equal('Salut tout le monde!');
      expect(wrapper.childAt(1).text()).to.equal('29 mars 2016 14:30 +00:00');
      expect(wrapper.childAt(2).text()).to.equal('42,00 €');
      expect(wrapper.childAt(3).text()).to.equal('€');
    });

    it('should have helpers in `res` server-side', () => {
      const props = {
        res: {
          locals: {},
        },
      };

      expect(Object.keys(DecoratedDummyComponent.preFetch(props).res.locals))
        .to.deep.equal(['translator']);
    });
  });

  describe('with default Namespace', () => {
    const DecoratedDummyComponent = provideTranslate(
      createTranslator({ ...translatorParams, scope: 'namespace' })
    )(DummyComponent);

    it('should render and display all translations', () => {
      const wrapper = mount(<DecoratedDummyComponent />);
      expect(wrapper.childAt(0).text()).to.equal('Salut à vous!');
      expect(wrapper.childAt(1).text()).to.equal('29 mars 2016 14:30 +00:00');
      expect(wrapper.childAt(2).text()).to.equal('42,00 €');
      expect(wrapper.childAt(3).text()).to.equal('€');
    });

    it('should have helpers in `res` server-side', () => {
      const props = {
        res: {
          locals: {},
        },
      };

      expect(Object.keys(DecoratedDummyComponent.preFetch(props).res.locals))
        .to.deep.equal(['translator']);
    });
  });
});
