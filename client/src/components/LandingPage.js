import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
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
import Link from '@mui/material/Link';
import { ThemeProvider } from '@mui/material/styles';
import DefaultTheme from './DefaultTheme';
import DarkTheme from './DarkTheme';
import { useThemeContext } from './ThemeContext';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useParams } from 'react-router-dom';

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
  const { id } = useParams();

  useEffect(() => {
    fetchReservations(setReservations);
  }, []);

  return (
    <ThemeProvider theme={themeMode === "dark" ? DarkTheme : DefaultTheme}>
      <CssBaseline />
      <AppBar position="sticky" color={themeMode === "light" ? "primary" : "secondary"}>
        <Typography sx="" variant="h6" color="inherit" align="left" noWrap>
          Upcoming Reservations
        </Typography>
      </AppBar>
      <main>
      <Paper bgcolor='background.paper' elevation={0} maxWidth="lg">
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 0,
          }}
        >
          <Container bgcolor='background.paper' maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Upcoming Reservations!
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Below are reservations that are coming up soon! Book now to lock in your SpaceTime!
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
        <Container sx={{ bgcolor: 'background.paper', py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {reservations.map((reservations) => (
              
              <Grid item key={reservations.id} xs={12}>
                <Link to={`/${reservations.id}/spacedetails/${reservations.roomId}`} underline="none">
                <Card sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px',
                  transition: 'transform .2s',
                  '&:hover': {
                    transform: 'scale(1.02)'
                  }
                }}>
                  <CardMedia
                    component="div"
                    sx={{
                      width: 200,
                      height: 200,
                      backgroundSize: 'cover',
                      borderRadius: '8px 0 0 8px',
                      padding: '16px'
                    }}
                    image={`https://source.unsplash.com/random?wallpapers&id=${reservations.id}`}
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1, justifyContent: 'space-between', alignItems: 'center', marginLeft: '16px' }}>
                    <CardContent sx={{ padding: '16px' }}>
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
                      <Link to={`/${reservations.id}/spacedetails/${reservations.roomId}`} underline="none">
                        <Button startIcon={<VisibilityIcon />} size="small" variant="outlined" color="primary">View</Button>
                        </Link>
                        <Link to={`/${id}/editspace/${reservations.id}`} style={{ textDecoration: 'none' }}>
                        <Button startIcon={<EditIcon />} size="small" variant="contained" color="primary">Edit</Button>
                        </Link>
                      </Stack>
                    </CardActions>
                  </Box>
                </Card>
                </Link>
              </Grid>

            ))}
          </Grid>
        </Container>
        </Paper>
      </main>
    </ThemeProvider>
  );
}