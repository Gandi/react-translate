import { expect } from 'chai';
import { getDisplayName, getDataDependency } from './component-helper.js';

describe('component-helper', () => {
  describe('getDisplayName', () => {
    it('get displayName', () => {
      expect(getDisplayName({
        displayName: 'foo',
        name: 'bar',
      })).to.equal('foo');
    });

    it('get name', () => {
      expect(getDisplayName({
        name: 'bar',
      })).to.equal('bar');
    });

    it('get displayName', () => {
      expect(getDisplayName({
      })).to.equal('Component');
    });
  });

  describe('getDataDependency', () => {
    it('has no methodName', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(getDataDependency({ noop: () => {} }, 'foo')).to.be.null;
    });

    it('has a methodName', () => {
      expect(getDataDependency({ noop: () => {} }, 'noop')).to.be.a('function');
    });

    it('has a child w/ a methodName', () => {
      expect(getDataDependency({ WrappedComponent: { noop: () => {} } }, 'noop'))
        .to.be.a('function');
    });
  });
});
