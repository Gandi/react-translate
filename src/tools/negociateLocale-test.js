import { expect } from 'chai';

import negociateLocale from './negociateLocale';


describe('negociateLocale()', () => {
  it('should return the first available locale', () => {
    const preferedLocales = ['fr', 'es', 'en'];
    const availableLocales = ['es', 'en'];
    const defaultLocale = 'en';

    const locale = negociateLocale(
      preferedLocales,
      availableLocales,
      defaultLocale
    );

    expect(locale).to.equal('es');
  });

  it('should return the default locale if unavailable', () => {
    const preferedLocales = ['de'];
    const availableLocales = ['fr', 'es', 'en'];
    const defaultLocale = 'en';

    const locale = negociateLocale(
      preferedLocales,
      availableLocales,
      defaultLocale
    );

    expect(locale).to.equal('en');
  });
});
