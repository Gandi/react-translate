/* eslint react/no-multi-comp: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { expect } from 'chai';
import { mount } from 'enzyme';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { stubWithTranslator, stubProvideTranslate } from '../test';
import { withTranslator } from './withTranslator';
import translatorType from '../react/translatorType';


global.__DEV__ = true;
global.__SERVER__ = true;


class DummyComponent extends React.Component {
  static propTypes = {
    __: PropTypes.func.isRequired,
    formatPrice: PropTypes.func.isRequired,
    formatDate: PropTypes.func.isRequired,
    formatCurrency: PropTypes.func.isRequired,
  };

  static contextTypes = {
    translator: PropTypes.object.isRequired,
  };

  render() {
    const { __, formatPrice, formatDate } = this.props;

    return (
      <div>
        <span>{__('This is a test %(username)s!', { username: 'Alexis' })}</span>
        <span>{__('This is a test %(username)s!', { username: <p>Component</p> })}</span>
        <span
          dangerouslySetInnerHTML={
            __('This is a test %(username)s!', {
              username: <p>Component</p>,
              withHTML: true,
              escapeParameters: false,
            })
          }
        />
        <span dangerouslySetInnerHTML={__('This is a strong test', { withHTML: true })} />
        <span>{formatPrice(42, 'EUR')}</span>
        <span>{formatDate('2016-03-29T14:30:45Z', 'LLL Z')}</span>
      </div>
    );
  }
}

// A list of references for test readability.
// It looks like react `ref` property have issues with enzyme `mount`.
const refs = {
  simpleTranslate: 0,
  componentTranslate: 1,
  componentTranslateWithHtml: 2,
  withHTML: 3,
  formatPrice: 4,
  formatDate: 5,
};

describe('@withTranslator', () => {
  describe('basic usage', () => {
    const App = stubWithTranslator({
      translations: {
        root: {
          'This is a test %(username)s!': 'C\'est un test %(username)s!',
          'This is a strong test': 'C\'est un <strong>test</strong>',
        },
      },
      locale: 'fr',
      scope: 'root',
    })(DummyComponent);

    describe('__()', () => {
      it('should translate a string', () => {
        const wrapper = mount(<App />);
        expect(wrapper.childAt(refs.simpleTranslate).text())
          .to.equal('C\'est un test Alexis!');
      });

      it('should translate a string with HTML', () => {
        const wrapper = mount(<App />);
        expect(wrapper.childAt(refs.withHTML).html()).to.equal(
          '<span>C\'est un <strong>test</strong></span>'
        );
      });
    });

    describe('__()', () => {
      it('should accept components', () => {
        const wrapper = mount(<App />);
        expect(wrapper.childAt(refs.componentTranslate).text())
          .to.equal('C\'est un test <p>Component</p>!');
      });

      it('should accept components with HTML', () => {
        const wrapper = mount(<App />);
        expect(wrapper.childAt(refs.componentTranslateWithHtml).text())
          .to.equal('C\'est un test Component!');
      });

      it('should translate a string with HTML', () => {
        const wrapper = mount(<App />);
        expect(wrapper.childAt(refs.withHTML).html()).to.equal(
          '<span>C\'est un <strong>test</strong></span>'
        );
      });
    });
  });

  describe('with namespace in provider', () => {
    const translations = {
      'Hello World!': 'No namespace',
      foo: { 'Hello World!': 'from foo namespace' },
      bar: { 'Hello World!': 'from bar namespace' },
      foobar: { 'Hello World!': 'from foobar namespace' },
    };

    it('should ignore provider namespace if defined - it is deprecated', () => {
      const AppWTranslator = withTranslator('bar')(({ __ }) => <span>{__('Hello World!')}</span>);
      const App = stubProvideTranslate({ translations, scope: 'foo' })(AppWTranslator);

      expect(mount(<App />)).to.have.text('from foo namespace');
    });

    it('should use __ namespace if provided', () => {
      const AppWTranslator = withTranslator('bar')(
        ({ __ }) => <span>{__('Hello World!', { scope: 'foobar' })}</span>
      );
      const App = stubProvideTranslate({ translations, scope: 'foo' })(AppWTranslator);

      expect(mount(<App />)).to.have.text('from foobar namespace');
    });
  });

  describe('formatPrice()', () => {
    const App = stubWithTranslator({
      locale: 'fr',
    })(DummyComponent);

    it('should format a price', () => {
      const wrapper = mount(<App />);
      expect(wrapper.childAt(refs.formatPrice).text()).to.equal('42,00 €');
    });
  });

  describe('formatDate()', () => {
    const App = stubWithTranslator({
      locale: 'fr',
    })(DummyComponent);

    it('should format a date', () => {
      const wrapper = mount(<App />);
      expect(wrapper.childAt(refs.formatDate).text()).to.equal('29 mars 2016 14:30 +00:00');
    });
  });
});

describe('__() parameters', () => {
  /**
   * utility function that:
   *
   * - stub context for `withTranslator`
   * - generate __ function from context through `withTranslator`
   * - serialize __ call result
   * - deserialize result and returns it.
   *
   * This makes the whole thing a bit tricky, but the goal is to test
   * `withTranslator`, and serialization is the best way I found to read the
   * result.
   *
   * Moreover, it gives the illusion you use the __ function directly.
   *
   * @param string  str the string to translate
   * @param object  options the __ options
   * @param {string|object}
   */
  const createTranslate = (translations = {}) => (str, options) => {
    // create a component
    @stubProvideTranslate({
      translations: {
        root: translations,
      },
      locale: 'fr',
      scope: 'root',
    })
    @withTranslator()
    class TranslateTest extends React.Component {
      static propTypes = {
        __: PropTypes.func.isRequired,
      }

      render() {
        // it is required to use a dom node.
        return <span>{JSON.stringify(this.props.__(str, options))}</span>;
      }
    }

    // render the component and return the content text.
    // this should be enough to mimick the __ behavior.
    return JSON.parse(mount(<TranslateTest />).text());
  };

  describe('basic usage', () => {
    const __ = createTranslate({
      Hello: 'Bonjour',
      'Welcome %(username)s!': 'Bienvenue %(username)s!',
      'I end with a dot.': 'Je finis par un point.',
      'I have. Some dots.': 'J\'ai. Des points.',
      'I have a lot of dots...': 'J\'ai beaucoup de points...',
      'empty with %(arg)s': '',
    });

    it('should have optional second argument', () => {
      expect(__('Hello')).to.equal('Bonjour');
    });

    it('should accept non given strings', () => {
      expect(__('Blah')).to.equal('Blah');
    });

    it('should replace placeholders', () => {
      expect(__('foo %(bar)s', { bar: 'barbar' })).to.equal('foo barbar');
    });

    it('should rely on react to escape parameters', () => {
      expect(__('foo %(bar)s', { bar: '<bar>' })).to.equal('foo <bar>');
    });

    it('should accept strings ending with dots', () => {
      expect(__('I end with a dot.')).to.equal('Je finis par un point.');
    });

    it('should use original string if no translation provided', () => {
      expect(__('empty with %(arg)s', { arg: 'foo' })).to.equal('empty with foo');
    });

    it('should accept strings with dots', () => {
      expect(__('I have. Some dots.')).to.equal('J\'ai. Des points.');
    });

    it('should accept a lot of dots', () => {
      expect(__('I have a lot of dots...')).to.equal('J\'ai beaucoup de points...');
    });
  });

  describe('withHTML', () => {
    const __ = createTranslate({});

    it('should return an object', () => {
      const options = {
        withHTML: true,
      };

      expect(__('<foo>', options)).to.deep.equal({
        __html: '<foo>',
      });
    });

    it('should escape parameters', () => {
      const options = {
        withHTML: true,
        bar: '<bar>',
      };

      expect(__('foo %(bar)s', options)).to.deep.equal({
        __html: 'foo &lt;bar&gt;',
      });
    });

    it('should be possible to use raw parameters', () => {
      const options = {
        withHTML: true,
        escapeParameters: false,
        bar: '<bar>',
      };

      expect(__('foo %(bar)s', options)).to.deep.equal({
        __html: 'foo <bar>',
      });
    });
  });

  describe('plurals', () => {
    const __ = createTranslate({
      'x_domain|zero': 'Aucun domaine',
      'x_domain|one': 'Un domaine',
      'x_domain|other': '%(count)s domaines',
    });

    it('should use expected translation when 0 items', () => {
      expect(__('x_domain', { count: 0 })).to.equal('Aucun domaine');
    });

    it('should use expected translation when 0 items', () => {
      expect(__('x_domain', { count: 1 })).to.equal('Un domaine');
    });

    it('should use expected translation when several items', () => {
      expect(__('x_domain', { count: 4 })).to.equal('4 domaines');
    });
  });

  describe('hoist static properties', () => {
    const noop = () => {};

    class TestingComponent extends React.Component {
      static preFetch(props) {
        return props;
      }
    }

    it('should decorate preFetch with merged props', () => {
      const decoratedComponent = withTranslator()(TestingComponent);

      const decoratedProps = decoratedComponent.preFetch({
        // some properties
        foo: 'foo',
        // required for withTranslator
        res: {
          locals: {
            translator: {
              translate: noop,
              localize: noop,
              numberFormat: noop,
              prize: noop,
              mapCurrencyISOToSymbol: noop,
            },
          },
        },
      });

      expect(decoratedProps).to.have.property('localize');
      expect(decoratedProps).to.have.property('formatDate');
      expect(decoratedProps).to.have.property('formatPrice');
      expect(decoratedProps).to.have.property('formatCurrency');
      expect(decoratedProps).to.have.property('__');
      expect(decoratedProps).to.have.property('foo', 'foo');
    });

    it('should decorate preFetch with namespaced props', () => {
      const decoratedComponent = withTranslator({
        propsNamespace: 'translator',
      })(TestingComponent);

      const decoratedProps = decoratedComponent.preFetch({
        // some properties
        foo: 'foo',
        // required for withTranslator
        res: {
          locals: {
            translator: {
              translate: noop,
              localize: noop,
              numberFormat: noop,
              prize: noop,
              mapCurrencyISOToSymbol: noop,
            },
          },
        },
      });

      expect(decoratedProps).to.have.deep.property('translator.localize');
      expect(decoratedProps).to.have.deep.property('translator.formatDate');
      expect(decoratedProps).to.have.deep.property('translator.formatPrice');
      expect(decoratedProps).to.have.deep.property('translator.formatCurrency');
      expect(decoratedProps).to.have.deep.property('translator.__');
      expect(decoratedProps).to.have.property('foo', 'foo');
    });

    it('should keep other static methods', () => {
      class TestingComponent2 extends React.Component {
        static foo() {
          return 'foo';
        }
      }

      const decoratedComponent = withTranslator()(TestingComponent2);

      expect(decoratedComponent.foo()).to.equal('foo');
    });
  });

  describe('purerendermixin', () => {
    let renderCalls = 0;
    let testComponentInstance;

    class TestComponent extends React.Component {
      constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        testComponentInstance = this;
      }

      render() {
        renderCalls++;
        return <div />;
      }
    }

    const DecoratedComponent = withTranslator()(TestComponent);

    class ContextInjectorComponent extends React.Component {
      static childContextTypes = {
        translator: translatorType,
      };

      getChildContext() {
        return { translator: this.props };
      }

      render() {
        return <DecoratedComponent />;
      }
    }

    it('should update only when state change, or context change', () => {
      const wrapper = mount(
        <ContextInjectorComponent
          translate={() => ('translate')}
          localize={() => ('localize')}
          createNumberFormat={() => () => ('numberFormat')}
          mapCurrencyISOToSymbol={() => ('mapCurrencyISOToSymbol')}
        />
      );
      expect(renderCalls).to.equal(1);

      testComponentInstance.setState({ foo: 'bar' });
      expect(renderCalls).to.equal(2);

      testComponentInstance.setState({ foo: 'bar' });
      expect(renderCalls).to.equal(2);

      testComponentInstance.setState({ foo: 'baz' });
      expect(renderCalls).to.equal(3);

      wrapper.setProps({ translate: () => ('foo') });
      testComponentInstance.setState({ foo: 'baz' });
      expect(renderCalls).to.equal(4);

      wrapper.setProps({});
      testComponentInstance.setState({ foo: 'baz' });
      expect(renderCalls).to.equal(4);
    });
  });
});
