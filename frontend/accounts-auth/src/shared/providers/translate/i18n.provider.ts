import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';

import { enUS, ptBR, esES } from '../../../locale';

const resources = {
  'en-US': {
    translation: enUS,
  },
  'pt-BR': {
    translation: ptBR,
  },
  'es-ES': {
    translation: esES,
  },
};

export const i18nInit = (language: string) =>
  i18n.use(initReactI18next).init({
    resources,
    lng: language || 'en-US',
    fallbackLng: 'en-US',
  });

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const translateString = (message: string, rest: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation(['translation']);

  return t(message, rest);
};
