import React from 'react';
import { Container, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import * as S from './styles';
import { IContentProps } from './@types';

function Content(props: IContentProps) {
  return (
    <S.BoxRoot opened={props.opened} smallDown={props.smallDown}>
      <Toolbar />
      <>
        <S.BoxContent p={8}>
          <Container maxWidth="md">
            <Outlet />
          </Container>
        </S.BoxContent>
      </>
    </S.BoxRoot>
  );
}

export default Content;
