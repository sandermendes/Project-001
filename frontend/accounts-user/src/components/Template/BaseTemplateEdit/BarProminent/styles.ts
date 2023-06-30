import { styled } from '@mui/material/styles';
import { Grid, Toolbar, Typography } from '@mui/material';

export const ToolBarRoot = styled(Toolbar)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    minHeight: 128,
  },
  [theme.breakpoints.down('sm')]: {
    minHeight: 'unset',
  },
  display: 'flex',
  flexWrap: 'wrap',
}));

export const GridRoot = styled(Grid)(() => ({
  flexGrow: 1,
}));

export const GridSubContent = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    width: 800,
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

export const Title = styled(Typography)(() => ({
  flexGrow: 1,
  alignSelf: 'center',
}));
