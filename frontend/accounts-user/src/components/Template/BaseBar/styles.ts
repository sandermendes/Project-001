import { styled } from '@mui/material/styles';
import { Typography, IconButton } from '@mui/material';

export const LogoText = styled(Typography)(() => ({
  alignItems: 'center',
  display: 'flex',
}));

export const LogoRoot = styled('div')(() => ({}));

export const AccountButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(1),
  color: 'inherit',
}));
