import { styled } from '@mui/material/styles';
import { ListItem, ListItemButton } from '@mui/material';
import React from 'react';
import { ListItemButtonRootProps } from './@types';

export const ListItemRoot = styled(ListItem)(() => ({
  minHeight: 65,
}));

export const ListItemButtonRoot = styled(ListItemButton)(() => ({
  height: '65px',
})) as React.ComponentType<ListItemButtonRootProps>;
