import { styled } from '@mui/material/styles';
import { Avatar } from '@mui/material';

export const HeaderAvatar = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
}));

export const AvatarRoot = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(30),
  height: theme.spacing(30),
}));
