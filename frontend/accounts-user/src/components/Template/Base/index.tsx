import React from 'react';
import { CssBaseline } from '@mui/material';
import { IBaseProps } from './@types';

function Base(props: IBaseProps) {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      {props.children}
    </div>
  );
}

export default Base;
