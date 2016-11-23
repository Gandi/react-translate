import React from 'react';
import ReactDOM from 'react-dom';
import { provideTranslate, createTranslator } from '@gandi/react-translate';

import App from './App';
import './index.css';

// it's up to you to detect the locale of your user
// (by url, cookie, header X-Accept-Language, etc)
const matches = document.location.search.match(/lang=(.*)/);
const locale = (Array.isArray(matches) && matches.pop()) || 'en';

// it's up to you to define a strategy of how to retrieve your translations
// (by a <script> tag, directly into the DOM, asynchronously by fetching an url, etc)
const translations = {
  fr: {
    'Get started!': 'Cette page utilise <a href="https://github.com/Gandi/react-translate">@gandi/react-translate</a> pour formater textes, nombres, dates, etc.',
    'A price sample': 'Un exemple de prix',
    'A date sample': 'Un exemple de date',
    'Switch to french': 'Traduire en français',
    'Switch to english': 'Traduire en anglais',
  },
  en: {
    'Get started!': 'This page is using <a href="https://github.com/Gandi/react-translate">@gandi/react-translate</a> for format texts, numbers, dates, etc.',
    'A price sample': 'A price sample',
    'A date sample': 'A date sample',
    'Switch to french': 'Switch to french',
    'Switch to english': 'Switch to english',
  },
}

// define your translations params
const translatorParams = {
  translations: translations[locale],   // translations for an unique language
  locale,                               // user's locale
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
