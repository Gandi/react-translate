Sample translated app
=====================

This is a `create-react-app` application with a straightforward setup of `@gandi/react-translate`.

## Messages extraction

```
npm run i18n extract_messages ./src root && npm run i18n create_catalog && npm run i18n update_catalog
```

Then translate your JSON files present in the `locales` directory and you're done.
