import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Copyright from './Copyright';
import DefaultTheme from './DefaultTheme';

export default function Footer() {
  return (
    <ThemeProvider theme={DefaultTheme}>
      <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '5vh',
          }}>
          <Container maxWidth="lg">
            <Copyright />
          </Container>
        </Box>
    </ThemeProvider>
  );
}