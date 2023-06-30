import React from 'react';
import { AppBar, Grid, IconButton } from '@mui/material';
import BaseBar from '../../BaseBar';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import * as S from './styles';
import { IBarProminentProps } from './@types';

function BarProminent(props: IBarProminentProps) {
  const navigate = useNavigate();

  return (
    <AppBar position="relative">
      <S.ToolBarRoot>
        <Grid container>
          <BaseBar logoTextColor="#6e6e6e" />
        </Grid>
        <S.GridRoot container justifyContent="center">
          <S.GridSubContent container justifyContent="center">
            <IconButton onClick={() => navigate('/u/user-info')}>
              <ArrowBackIcon color="secondary" />
            </IconButton>
            <S.Title variant="h5" noWrap color="secondary">
              {props.title}
            </S.Title>
          </S.GridSubContent>
        </S.GridRoot>
      </S.ToolBarRoot>
    </AppBar>
  );
}

export default BarProminent;
