import React from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { appInternalRoute } from '../../../../routes';
import { TranslatedString } from '../../../../shared/providers/translate';
import { useLocation, Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import * as S from './styles';
import { IListItemLinkProps, ISideMenuProps } from './@types';

export const drawerWidth = 280;

const paperProps = {
  width: drawerWidth,
  flexShrink: 0,
  ['& .MuiDrawer-paper']: { width: drawerWidth, boxSizing: 'border-box' },
};

function ListItemLink(props: IListItemLinkProps) {
  const { icon, primary, to } = props;
  const location = useLocation();

  // const CustomLink = useMemo(
  //     () =>
  //         React.forwardRef((linkProps, ref) => (
  //             <Route ref={ref} to={to} {...linkProps} />
  //         )),
  //     [to],
  // );

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const CustomLink = React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((linkProps, ref) => <RouterLink ref={ref} to={to} {...linkProps} />);

  return (
    <ListItem disablePadding>
      <ListItemButton selected={to === location.pathname} component={CustomLink}>
        <ListItemIcon style={{ paddingRight: '16px', minWidth: 'unset' }}>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
      </ListItemButton>
    </ListItem>
  );
}

function SideMenu({ opened, smallDown }: ISideMenuProps) {
  const nameSpace = ['translation', 'Routes'];

  return (
    <S.DrawerRoot variant={!smallDown ? 'persistent' : undefined} PaperProps={{ sx: paperProps }} open={opened}>
      <Toolbar />
      <S.DrawerDiv>
        <List>
          {appInternalRoute.map((internalRoute, index) => (
            <ListItemLink
              key={index}
              to={internalRoute.path}
              icon={internalRoute.icon}
              primary={<TranslatedString nameSpace={nameSpace} message={internalRoute.itemName} />}
            />
          ))}
        </List>
      </S.DrawerDiv>
    </S.DrawerRoot>
  );
}

export default SideMenu;
