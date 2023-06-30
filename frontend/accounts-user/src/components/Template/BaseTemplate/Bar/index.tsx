import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import BaseBar from '../../BaseBar';
import { IBarProps } from './@types';
import * as S from './styles';

function Bar(props: IBarProps) {
  const handleDrawerOpen = () => {
    props.handleDrawerOpen();
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <S.MenuButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
          <MenuIcon />
        </S.MenuButton>
        <BaseBar />
      </Toolbar>
    </AppBar>
  );
}

export default Bar;
