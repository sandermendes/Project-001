import React from 'react';
import * as S from './styles';
import { IPageHeaderProps } from './@types';

function PageHeader(props: IPageHeaderProps) {
  return (
    <S.Header>
      {props.children}
      {props.mainTag ? <S.H1Title>{props.title}</S.H1Title> : <S.H2Title>{props.title}</S.H2Title>}
      <S.HeaderMainInfo style={props.alignInfoCenter ? { textAlign: 'center' } : {}}>{props.info}</S.HeaderMainInfo>
    </S.Header>
  );
}

export default PageHeader;
