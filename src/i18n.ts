import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import translationPL from './locales/pl.json';
import translationEN from './locales/en.json';

const resources = {
  en: {
    translation: translationEN,
  },
  pl: {
    translation: translationPL,
  },
};

i18n.use(LanguageDetector).use(initReactI18next).init({
  fallbackLng: 'en',
  resources,
});

export default i18n;
