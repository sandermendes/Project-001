import React from 'react';
import { i18nInit, translateString } from './i18n.provider';

export interface ITranslateProviderInterface {
  language: string;
  children?: React.ReactNode;
}

export const TranslateProvider = (props: ITranslateProviderInterface) => {
  i18nInit(props.language);

  return <>{props.children}</>;
};

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const TranslatedString = ({ nameSpace, message, ...rest }: any) => <>{translateString(nameSpace, message, { ...rest })}</>;

export const translatedString = (nameSpace: string[], message: string, ...rest: string[]) => translateString(nameSpace, message, { ...rest });
