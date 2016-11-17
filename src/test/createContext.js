import createTranslator from '../tools/createTranslator';

const createContext = () => {
  const translatorArgs = {
    translations: {},
    locale: 'en',
    utcOffset: 0,
    defaultLocale: 'en',
    logMissing: false,
  };

  return {
    translator: createTranslator(translatorArgs),
  };
};
export default createContext;
