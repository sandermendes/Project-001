import React from 'react';
import { Home as HomeIcon, Person } from '@mui/icons-material';
import Home from '../pages/Home';
import UserInfo from '../pages/UserInfo';

export const HOME = '/u';

export const appInternalRoute = [
  {
    titleBar: false,
    itemName: 'Routes.home',
    icon: <HomeIcon />,
    path: HOME,
    component: <Home />,
    cls: 'Home',
  },
  {
    titleBar: false,
    itemName: 'Routes.userInfo',
    icon: <Person />,
    path: `${HOME}/user-info`,
    component: <UserInfo />,
    cls: 'UserInfo',
  },
];
