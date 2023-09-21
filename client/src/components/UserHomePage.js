import React, { useEffect, useState } from 'react';
// import AppBar from '@mui/material/AppBar';
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
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';


function fetchReservations(setupcomingSpaces) {
  fetch('http://localhost:8080/reservations')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      setupcomingSpaces(data.slice(0, 6));
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

const defaultTheme = createTheme();

export default function LandingPage() {
  const [upcomingSpaces, setupcomingSpaces] = useState([]);

  useEffect(() => {
    fetchReservations(setupcomingSpaces);
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      {/* <AppBar position="relative">
        <Typography variant="h6" color="inherit" noWrap>
          TimeSpace Connections
        </Typography>
      </AppBar> */}
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


            <Stack direction="row" justifyContent="space-between" spacing={2} sx={{ mt: 3, mb: 3 }}>
              <Button
                variant="contained"
                component={Link} to="/LogIn"
                sx={{
                  fontSize: '1.5rem',
                  px: 4,
                  py: 2
                }}
              >
                Book a Space!
              </Button>
              <Button
                variant="contained"
                component={Link} to="/CreateAccount"
                sx={{
                  fontSize: '1.5rem',
                  px: 4,
                  py: 2
                }}
              >
                Admin
              </Button>
            </Stack>
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
            {upcomingSpaces.map((upcomingSpaces) => (
              <Grid item key={upcomingSpaces.id} xs={12}>
                <Card
                  sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      width: 200,
                      height: 140,
                      backgroundSize: 'cover'
                    }}
                    image={`https://source.unsplash.com/random?wallpapers&id=${upcomingSpaces.id}`}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Training Course - {upcomingSpaces.meetingName}
                    </Typography>
                    <Typography>
                      In Room - {upcomingSpaces.roomId}
                    </Typography>
                    <Typography>
                      Training Description - {upcomingSpaces.meetingDescription}
                    </Typography>
                    <Typography>
                      Start Time - {upcomingSpaces.meetingStart}
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

