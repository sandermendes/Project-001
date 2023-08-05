import { Link } from '@mui/material';
import { styled } from '@mui/material/styles';

import { APP_TITLE, BRAND_NAME } from '@/shared/constants/title';
import { ReactComponent as ProjectLogo } from '@/assets/images/svgs/main-logo.svg';

interface ISpanLogoProps {
  logoTextColor?: string;
}

const SpanLogo = styled('span')((props: ISpanLogoProps) => ({
  color: props.logoTextColor ? props.logoTextColor : '#fff',
  marginLeft: '10px',
  font: '"400 22.1px \'Product Sans\',Arial,Helvetica,sans-serif"',
  letterSpacing: '-1px',
  wordSpacing: '2px',
}));

function LogoTypes(type: string) {
  return type === 'lg' ? BRAND_NAME : BRAND_NAME;
}

interface LogoProps {
  logoTextColor?: string;
}

function Logo(props: LogoProps): JSX.Element {
  return (
    <Link href="/" underline="none" style={{ display: 'flex', alignItems: 'center' }}>
      <ProjectLogo width={32} height={32}/>
      <SpanLogo logoTextColor={props.logoTextColor}>{`${LogoTypes('sm')} ${APP_TITLE}`}</SpanLogo>
    </Link>
  );
}

export default Logo;
