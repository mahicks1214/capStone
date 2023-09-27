import { createTheme } from '@mui/material/styles';

const DefaultTheme = createTheme({
  palette: {
    mode: `light`,
    primary: {
      main: '#AC3945',
    },
    secondary: {
      main: '#5E2750',
    },
    background: {
      default: '#D3D3D3',
      paper: '#D3D3D3',
    }
  }
});

export default DefaultTheme;