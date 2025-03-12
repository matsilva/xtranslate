import i18next from 'i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next.use(XHR).use(LanguageDetector);

export default i18next;
