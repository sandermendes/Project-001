import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';

export const GridContentFields = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    width: 800,
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));
