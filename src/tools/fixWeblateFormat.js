/**
 * Weblate does not accept counterparts pluralizer format.
 *
 * Instead, we use a |:
 *
 * ```
 * // weblate json format
 * {
 *   'much meow %(count)|zero': 'no meow',
 *   'much meow %(count)|one': 'meow',
 *   'much meow %(count)|other': 'much meow %(count)'
 * }
 * ```
 *
 * ```
 * // counterparts json format
 * {
 *   'much meow %(count)': {
 *     'zero': 'no meow',
 *     'one': 'meow',
 *     'other': 'much meow %(count)'
 *   }
 * }
 * ```
 */
const fixWeblateFormat = (json) => {
  if (typeof json === 'string') {
    return json;
  }

  return Object.keys(json).reduce((acc, key) => {
    const value = json[key];

    // Empty string values are untranslated strings: they should fall back
    // instead of printing an empty string, so we remove them.
    if (value === '') {
      return acc;
    }

    // Use sub-dicts for plurals instead of our custom flattened structure.
    if (key.indexOf('|') >= 0) {
      const [realKey, modifier] = key.split('|');
      return {
        ...acc,
        [realKey]: {
          ...acc[realKey],
          [modifier]: fixWeblateFormat(value),
        },
      };
    }

    return {
      ...acc,
      [key]: fixWeblateFormat(value),
    };
  }, {});
};

// export for internal usage.
export default fixWeblateFormat;
