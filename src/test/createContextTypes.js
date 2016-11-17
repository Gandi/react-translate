import translatorType from '../react/translatorType';

export default function createContextTypes() {
  return {
    translator: translatorType.isRequired,
  };
}
