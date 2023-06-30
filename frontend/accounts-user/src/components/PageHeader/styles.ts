import { styled } from '@mui/material/styles';

export const Header = styled('header')(() => ({
  paddingLeft: '16px',
  paddingRight: '16px',
}));

export const H1Title = styled('h1')(() => ({
  fontSize: '1.75rem',
  fontWeight: 400,
  letterSpacing: 0,
  lineHeight: '2.25rem',
  hyphens: 'auto',
  wordBreak: 'break-word',
  wordWrap: 'break-word',
  color: '#202124',
  textAlign: 'center',
}));

export const H2Title = styled('h2')(() => ({
  fontSize: '1.375rem',
  fontWeight: 400,
  letterSpacing: 0,
  lineHeight: '1.75rem',
  hyphens: 'auto',
  wordBreak: 'break-word',
  wordWrap: 'break-word',
  color: '#202124',
}));

export const HeaderMainInfo = styled('div')(() => ({
  letterSpacing: '.00625em',
  fontSize: '1rem',
  fontWeight: 400,
  lineHeight: '1.5rem',
  hyphens: 'auto',
  wordBreak: 'break-word',
  wordWrap: 'break-word',
  color: '#5f6368',
  marginTop: 16,
}));
