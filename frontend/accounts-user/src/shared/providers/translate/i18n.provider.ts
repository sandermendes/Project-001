import { initReactI18next, useTranslation } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import * as locale from '../../locale';
import i18next from 'i18next';

const resources = {
  'de-DE': {
    translation: locale.deDE,
  },
  'en-US': {
    translation: locale.enUS,
  },
  'es-ES': {
    translation: locale.esES,
  },
  'fr-FR': {
    translation: locale.frFR,
  },
  'pt-BR': {
    translation: locale.ptBR,
  },
  'ru-RU': {
    translation: locale.ruRU,
  },
  'zh-CN': {
    translation: locale.zhCN,
  },
};

const detection = {
  order: ['querystring', 'cookie', 'localStorage', 'navigator'],

  lookupQuerystring: 'lng',
  lookupCookie: 'lng',
  lookupLocalStorage: 'lng',

  caches: ['localStorage', 'cookie'],

  cookieDomain: 'localhost',

  htmlTag: document.documentElement,

  cookieOptions: { path: '/', sameSite: 'strict' },
};

export const i18nInit = () =>
  i18next.use(LanguageDetector).use(initReactI18next).init({
    resources,
    detection,
    fallbackLng: 'en-US',
  });

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const translateString = (nameSpace: string[], message: string, rest: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation(nameSpace);

  return t(message, rest);
};
