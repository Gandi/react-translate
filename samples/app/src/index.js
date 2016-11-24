/* global document: true */

import url;

import React from 'react';
import ReactDOM from 'react-dom';

import { createTranslator, negociateLocale, provideTranslate } from 'gandi.translate';

import App from './App';
import './index.css';

const availableLocales = ['fr', 'en'];
const defaultLocale = 'en';

// It's up to you to detect the locale of your user
// (by url param, cookie, X-Accept-Language header, user pref etc)
const queryParamLocale = url.parse(redirectTo, true).query.lang;
const userBrowserLocales = window.navigator.languages ||
	[(window.navigator.language || window.navigator.userLanguage)];
const locale = negociateLocale([
      queryParamLocale,
      ...userBrowserLocales,
    ], availableLocales, defaultLocale);

// It's up to you to define a strategy of how to retrieve your translations
// (by a <script> tag, directly into the DOM, asynchronously by fetching an url, etc)
const translations = require(`../locales/${locale}/root.json`);

// Define your translations params
const translatorParams = {
  translations,         // translations for an unique language
  locale,               // user's locale
};

// Create translator
const translator = createTranslator(translatorParams);

// Provide the translator to your whole app
// (technically it will set the translator into the React context, you will be
// able to retrieve it with the withTranslator decorator).
const TranslatedApp = provideTranslate(translator)(App);

ReactDOM.render(
  <TranslatedApp />,
  document.getElementById('root')
);
