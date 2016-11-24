/* global document: true */

import React from 'react';
import ReactDOM from 'react-dom';
import { provideTranslate, createTranslator } from '@gandi/react-translate';

import App from './App';
import './index.css';

// it's up to you to detect the locale of your user
// (by url, cookie, header X-Accept-Language, etc)
const matches = document.location.search.match(/lang=(.*)/);
let locale = (Array.isArray(matches) && matches.pop()) || 'en';

const availableLocales = ['fr', 'en'];
if (!availableLocales.includes(locale)) {
  locale = 'en';
}

// it's up to you to define a strategy of how to retrieve your translations
// (by a <script> tag, directly into the DOM, asynchronously by fetching an url, etc)
const translations = require(`../locales/${locale}/root.json`);

// define your translations params
const translatorParams = {
  translations,         // translations for an unique language
  locale,               // user's locale
};

// create translator
const translator = createTranslator(translatorParams);

// provide the translator to your whole app
// (technically it will set the translator into the React context, you will be
// able to retrieve it with the withTranslator decorator).
const TranslatedApp = provideTranslate(translator)(App);

ReactDOM.render(
  <TranslatedApp />,
  document.getElementById('root')
);
