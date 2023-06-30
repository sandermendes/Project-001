import { createTheme } from '@mui/material';
import { blue, pink } from '@mui/material/colors';

export const theme = createTheme({
  spacing: 4,
  palette: {
    primary: blue,
    secondary: pink,
  },
});

export const themeEdit = createTheme({
  spacing: 4,
  palette: {
    primary: {
      main: '#fff',
    },
    secondary: {
      main: '#6e6e6e',
    },
  },
});

export const themeEditContent = createTheme({
  spacing: 4,
  palette: {
    primary: blue,
    secondary: blue,
    // secondary: {
    //     main: '#6E6E6E'
    // },
  },
});
