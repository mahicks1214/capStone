import { createTheme } from '@mui/material/styles';

const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#AC3945',
    },
    secondary: {
      main: '#5E2750',
    },
    background: {
      default: '#121212',
      paper: '#121212',
    }
  }
});

export default DarkTheme;