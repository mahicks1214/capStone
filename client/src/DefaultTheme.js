import { createTheme } from '@mui/material/styles';

const DefaultTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6699CC',
    },
    secondary: {
      main: '#CC6699',
    },
  },
});

export default DefaultTheme;