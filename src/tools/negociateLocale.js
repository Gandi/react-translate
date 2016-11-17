import _ from 'lodash';


/**
 * Returns the best match for the user's locale.
 *
 * @param Array   preferedLocales   the locales requested
 * @param Array   availableLocales  locales available for the application
 * @param String  defaultLocale     the fallback locale
 *
 * @return String
 */
const negociateLocale = (
  preferedLocales = [],
  availableLocales,
  defaultLocale
) => {
  const validLanguages = _.intersection(
    preferedLocales.filter(x => x),
    availableLocales
  );

  if (validLanguages.length) {
    return validLanguages[0];
  }

  return defaultLocale;
};
export default negociateLocale;
