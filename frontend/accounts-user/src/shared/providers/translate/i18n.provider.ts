import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';

import * as locale from '../../locale';

const resources = {
  'en-US': {
    translation: locale.enUS,
  },
  'pt-BR': {
    translation: locale.ptBR,
  },
  'es-ES': {
    translation: locale.esES,
  },
};

export const i18nInit = (language: string) =>
  i18n.use(initReactI18next).init({
    resources,
    lng: language || 'en-US',
    fallbackLng: 'en-US',
  });

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const translateString = (nameSpace: string[], message: string, rest: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation(nameSpace);

  return t(message, rest);
};
