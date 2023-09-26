import { createTheme } from '@mui/material/styles';

const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#5E2750',
    },
    secondary: {
      main: '#AC3945',
    },
    background: {
      default: '#121212',
      paper: '#121212',
    }
  },
});

export default DarkTheme;