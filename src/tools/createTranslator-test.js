import { expect } from 'chai';

import createTranslator from './createTranslator';


describe('createTranslator()', () => {
  const translatorParams = {
    translations: {
      'This is a test %(username)s!': 'C\'est un test %(username)s!',
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

  it('should return 6 functions', () => {
    expect(Object.keys(translator)).to.deep.equal([
      'translator', 'translate', 'localize', 'createNumberFormat',
      'mapCurrencyISOToSymbol',
    ]);
  });

  describe('translator', () => {
    it('should be an object', () => {
      expect(translator.translator).to.be.an('object');
    });
  });

  describe('translate()', () => {
    it('should translate a string', () => {
      const translation = translator.translate('This is a test %(username)s!', {
        username: 'Alexis',
      });

      expect(translation).to.equal('C\'est un test Alexis!');
    });

    it('should fallback to the translation key if the translation is not found', () => {
      const translation = translator.translate('Lost in translation.');

      expect(translation).to.equal('Lost in translation.');
    });
  });

  describe('localize()', () => {
    it('should localize a date', () => {
      const date = translator.localize(
        '2016-03-29T14:30:45Z',
      ).format(
        'LLL ZZ'
      );

      expect(date).to.equal('29 mars 2016 14:30 +0000');
    });
  });

  describe('createNumberFormat()', () => {
    it('should display a price', () => {
      const price = translator.createNumberFormat({
        style: 'currency',
        currency: 'USD',
      }).format(42);

      expect(price).to.equal('42,00 $US');
    });
  });

  describe('mapCurrencyISOToSymbol()', () => {
    it('should display a currency symbol EUR - €', () => {
      const currency = translator.mapCurrencyISOToSymbol('EUR');

      expect(currency).to.equal('€');
    });

    it('should display a currency symbol USD - $US', () => {
      const currency = translator.mapCurrencyISOToSymbol('USD');

      expect(currency).to.equal('$US');
    });
  });
});
