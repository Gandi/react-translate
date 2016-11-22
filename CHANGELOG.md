# Change log

## [Unreleased]

### Added

  - Create a launcher for extract_messages, update_catalog and other scripts.

### Changed

  - Clean dependencies and improve installation part of the README.

## [1.0.0-alpha] - 2016-11-17

## 2016-11-15

### Added
  - Make the 'gandi' directory (in locales) before extraction.

### Changed
  * Clean deps: colors, lodash, moment are now peer deps.

## 2016-10-25
### Added
  * ability to render static components in translations variables.

## 2016-10-18
### Fixed
  * Export localeSelector

### Fixed
  - Deprecate action `selectLocale`.
    It will still work but will warn in dev environment.
    Please use `setLocale` instead.
    *BREAKING CHANGE*

    Before:
    ```
    import { selectLocale } from 'gandi.translate';

    dispatch(selectLocale('fr'));
    ```

    After:
    ```
    import { setLocale } from 'gandi.translate';

    dispatch(setLocale('fr'));
    ```

## 2016-09-30
### Changed
  - `stubWithTranslator` and `stubProvideTranslate` argument is now optional

## 2016-09-29
### Fixed
  - Pin intl dependency version, as 1.2.5 drops json files we use.

## 2016-09-23
### Fixed
  - Flow type for `@withTranslator` now accept void as well as
    `WithTranslatorOptions`. This was not reflected in `.flow` file.

## 2016-09-23
### Fixed
  - Flow type for `@withTranslator` now accept void as well as
    `WithTranslatorOptions`

## 2016-09-21
### Fixed
  * Add propsNamespace attribute in stubWithTranslator test helper

## 2016-09-19
### Changed
  - Consistant line ending (trailing whitespace) with Weblate for the locales source file.

## 2016-09-15
### Changed
  - clean react context and only expose a `translator` property.
  - Introduce a `translatorType` for context validation.
  - Add a `formatNumber` method to translator props.
  - Merge react context `translator.prize` and `translator.numberFormat` into
    a single `translator.createNumberFormat` method.

**WARNING BREAKING CHANGE** react context format changed. If you rely on it, you
should upgrade with care.

## 2016-08-26
### Fix
  - Fix Flow annotation.

## 2016-08-26
### Added
  - Add the `propsNamespace` option to `withTranslator`.
  - Add Flow setup and add basic Flow declarations.

## 2016-08-26
### Fixed
  - Fix plural extraction by allowing decimal or string count var.

## 2016-08-05
### Fixed
  - Indent source file to 4 characters insted of 3 when extracting, like Weblate.

## 2016-08-04
### Changed
  - Use default exports when appropriate.
  It shouldn't be a breaking change, as libs are not meant to import directly
  from a specific file except from any index.js, which all kept the named exports.

## 2016-08-04
### Fixed
  - Fix undefined formatCurrency() function provided client-side by WithTranslator().

## 2016-08-04
### Fixed
  - Fix Intl.js client-side polyfill.

### Added
  - Add a mapCurrencyISOToSymbol() function to createTranslator()'s return.
  - Add a formatCurrency() function to WithTranslator() props.

### Changed
  - I18N object passed to createTranslator() function now expects a localeData key.
    To be used by Intl.js polyfill and the mapCurrencyISOToSymbol()/formatCurrency() functions.

## 2016-07-08
### Changed
  - Passing a namespace to both `@provideTranslate(namespace)` and `@withTranslate(namespace)` is now deprecated.
    Use `@provideTranslate()` and `@withTranslate()` instead.
  - `createTranslator(opts = {})` now uses `opts.scope` to define the translation namespace to be used.
  - `translator` object returned by `createTranslator()` now exposes an augmented `translate` function,
    which supports not-found translation fallback and namespace usage.

## 2016-07-05
### Fixed
  - Useless re-render on translated component

## 2016-07-05
### Fixed
  - Support dots in translations.
  - Fix props validations warnings with React >=15.2.

## 2016-06-17
### Fixed
  - `@stubProvideTranslate` should be available in browser (for samples for
    instance)

## 2016-06-15
### Added
  - Introduces `withTranslatorProps`.

## 2016-06-10
### Added
  - `provideTranslate` accepts a second (optional) argument: default translation
    scope.

## 2016-06-06
### Fixed
  - Hoist static non react properties (think breadcrumbs) in `withTranslator`.

## 2016-06-01
### Fixed
  - Fix parameter escaping logic for `__`.
  - Fix parameter escaping is done by default when `withHTML` is used.
### Added
  - Add doc.
### Changed
  - Migrate to react@15
  - `@stubProvideTranslate` expect weblate format for translations.

## 2016-05-17
### Fix
  - Fix dependencies.

## 2016-05-13
### Fix
  - Fix dependencies.

## 2016-05-13
### Fix
  - Fix dependencies.

## 2016-05-13
### Fix
  - Fix script to extract messages and update catalogs.

### Added
  - Add script in package.json on bin section.

## 2016-04-26
### Fix
  - Use better naming for test helpers to prevent conflict with other libs.

## 2016-04-24
### Fix
  - ~~Use gandi.react-helpers@2.0.0 (fix `chai` useless dependency).~~

### Changed
  - Flatten props in `preFetch` method.

## 2016-04-13
### Fix
  - Fix imports.

## 2016-04-12
### Fix
  - Fix compilation of test helpers.

### Added
  - Expose `stubProvideTranslate`, `stubWithTranslator`, `createContextTypes`, `createContext`.

## 2016-04-12
### Changed
  - context `localize` returns a moment instance
  - use `formatDate` to format a date

### Added
  - `<FromNow />` component
  - some README docs

## 2016-04-05
### Fixed
  - Fix initialization of UTC dates.

### Removed
  - Remove `utcOffset` paramater taken by `createTranslator`.

### Changed
  - Remove peerDependencies for npm3.

## 2016-04-01
### Added
  - Add a component to handle prices

### Changed
  - Split code
  - Rework code to be smaller, simpler
  - Rename Localizor to DateTime
  - Add new stubs `stubProvideTranslate` and `stubWithTranslator`.

### Removed
  - `translatorProps`
  - `stubTranslatorProvider`
  - Extract binaries (have to be rewritten, too coupled with the first adminv5 project structure)

## 2016-03-23
  - Export `createContextTypes` as test helper..

## 2016-03-17
  - Use decorators.

## 2016-03-15
  - Initial release.
