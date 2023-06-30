import React, { useEffect, useState } from 'react';
import Base from '../Base';
import { useMediaQuery, useTheme } from '@mui/material';
import Bar from './Bar';
import SideMenu from './SideMenu';
import Content from './Content';
import { IBaseTemplateProps } from './@types';

function BaseTemplate(props: IBaseTemplateProps) {
  const theme = useTheme();
  const smallDown = useMediaQuery(theme.breakpoints.down('md'));
  let smallUp = useMediaQuery(theme.breakpoints.up('md'));
  const [openDrawer, setOpenDrawer] = useState(smallUp);

  useEffect(() => {
    if (smallUp) setOpenDrawer(true);
    if (smallDown) setOpenDrawer(false);
  }, [smallDown, smallUp]);

  if (window.innerWidth >= 960 && !smallUp) smallUp = true;

  const handleDrawerOpen = () => setOpenDrawer(!openDrawer);

  return (
    <Base {...props}>
      <Bar {...props} handleDrawerOpen={handleDrawerOpen} />
      <SideMenu opened={openDrawer} smallDown={smallDown} />
      <Content {...props} opened={openDrawer} smallDown={smallDown} />
    </Base>
  );
}

export default BaseTemplate;
