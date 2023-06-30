import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { drawerWidth } from '../SideMenu';

interface IBoxRoot {
  opened?: boolean;
  smallDown?: boolean;
}

export const BoxRoot = styled(Box, { shouldForwardProp: (prop) => prop !== 'opened' && prop !== 'smallDown' })<IBoxRoot>(
  ({ theme, opened, smallDown }) => {
    const smallDown_opened = !smallDown && opened;
    return {
      flexGrow: 1,
      padding: 'unset!important',
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(3),
      },
      [theme.breakpoints.down('sm')]: {
        paddingLeft: '0',
        paddingRight: '0',
      },
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      ...(!smallDown && { marginLeft: `-${drawerWidth}px` }),
      ...(smallDown_opened && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    };
  }
);

export const BoxContent = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(6),
  // flexGrow: 1,
  // [theme.breakpoints.down('md')]: {
  //     width: `calc(100% - ${drawerWidth}px)`,
  //     marginLeft: drawerWidth,
  // },
  height: `calc(100% - ${64}px)`,
  overflow: 'auto',
  [theme.breakpoints.down('sm')]: {
    paddingLeft: '0',
    paddingRight: '0',
    height: 'unset',
  },
}));
