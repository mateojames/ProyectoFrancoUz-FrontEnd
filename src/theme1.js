import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#1D3461',
    },
    secondary: {
      main: '#FB3640',
    },
  },
  typography: {
    fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif',
  },
  props: {
    MuiAppBar: {
      color: 'transparent',
    },
  },
});

export default theme;