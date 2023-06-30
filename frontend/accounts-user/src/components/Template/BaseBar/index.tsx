import React from 'react';
import Logo from '../../Logo';
import * as S from './styles';
import { IBaseBarProps } from './@types';

function BaseBar(props: IBaseBarProps) {
  return (
    <>
      <S.LogoText variant="h6" noWrap>
        <S.LogoRoot>
          <Logo logoTextColor={props.logoTextColor} />
        </S.LogoRoot>
      </S.LogoText>
    </>
  );
}

export default BaseBar;
