
import Logo from '../../Logo';
import * as S from './styles';
import { IBaseBarProps } from './@types';
import RightBar from './RightBar';

function BaseBar(props: IBaseBarProps) {
  return (
    <>
      <S.LogoText variant="h6" noWrap sx={{ flexGrow: "1" }}>
        <S.LogoRoot>
          <Logo logoTextColor={props.logoTextColor} />
        </S.LogoRoot>
      </S.LogoText>
      <RightBar />
    </>
  );
}

export default BaseBar;
