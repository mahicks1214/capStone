import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// import Link from '@mui/material/Link';
import { ThemeProvider } from '@mui/material/styles';
import DefaultTheme from './DefaultTheme';
import DarkTheme from './DarkTheme';
import { useThemeContext } from './ThemeContext';


function fetchReservations(setReservations) {
  fetch('http://localhost:8080/reservations')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      setReservations(data.slice(0, 6));
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

export default function LandingPage() {
  const [reservations, setReservations] = useState([]);
  const { themeMode } = useThemeContext();

  useEffect(() => {
    fetchReservations(setReservations);
  }, []);

  return (
    <ThemeProvider theme={themeMode === "dark" ? DarkTheme : DefaultTheme}>
      <CssBaseline />
      <AppBar position="sticky" color={themeMode === "light" ? "primary" : "secondary"}>
        <Typography variant="h6" color="inherit" noWrap>
          Upcoming Reservations
        </Typography>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Upcoming Reservations!
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Below are reservations that are coming up soon! Book now to lock in your TimeSpace!
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >              
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {reservations.map((reservations) => (
              <Grid item key={reservations.id} xs={12}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      width: 200,
                      height: 140,
                      backgroundSize: 'cover'
                  }}
                    image={`https://source.unsplash.com/random?wallpapers&id=${reservations.id}`}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Training Course - {reservations.meetingName}
                    </Typography>
                    <Typography>
                      In Room - {reservations.roomId}
                    </Typography>
                    <Typography>
                      Training Description - {reservations.meetingDescription}
                    </Typography>
                    <Typography>
                      Start Time - {reservations.meetingStart}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Stack direction="column" spacing={1}>
                      <Button size="small">View</Button>
                      <Button size="small">Edit</Button>
                    </Stack>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}