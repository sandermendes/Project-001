import { styled } from '@mui/material/styles';
import { Drawer } from '@mui/material';
import { drawerWidth } from './index';

export const DrawerRoot = styled(Drawer)(() => ({
  width: drawerWidth,
  flexShrink: 0,
}));

export const DrawerDiv = styled('div')(() => ({
  overflow: 'auto',
}));
