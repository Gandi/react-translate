/**
 * Simple truthy-only, unique intersection function of two arrays.
 *
 * @param Array   array1
 * @param Array   array2
 *
 * @return Array
 */
function simpleIntersection(array1, array2) {
  return array1
    // Remove falsy elements
    .filter(el => el)
    // Match elements belonging in the two arrays
    .filter(el => array2.indexOf(el) !== -1)
    // Remove duplicates
    .filter((el, idx, arr) => arr.indexOf(el) === idx);
}

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
  const validLanguages =
  simpleIntersection(
    preferedLocales,
    availableLocales
  );

  if (validLanguages.length) {
    return validLanguages[0];
  }

  return defaultLocale;
};
export default negociateLocale;
