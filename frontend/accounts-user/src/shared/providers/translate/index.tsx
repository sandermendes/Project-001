import React from 'react';
import { i18nInit, translateString } from './i18n.provider';

export interface ITranslateProviderInterface {
  children?: React.ReactNode;
}

export const TranslateProvider = (props: ITranslateProviderInterface) => {
  i18nInit();

  return <>{props.children}</>;
};

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const TranslatedString = ({ nameSpace, message, ...rest }: any) => <>{ translateString(nameSpace, message, { ...rest }) }</>;

/* TODO: Fix this warning to fast refresh works properly */
// eslint-disable-next-line react-refresh/only-export-components
export const translatedString = (nameSpace: string[], message: string, ...rest: string[]) => translateString(nameSpace, message, { ...rest }) as string | undefined;
