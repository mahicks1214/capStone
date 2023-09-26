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
// import { Link } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import DefaultTheme from './DefaultTheme';
import { useThemeContext } from './Context';
import Admin from './Admin';
import { useUserContext} from "./UserContext";


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
  const  {currentUser}  = useUserContext();


  useEffect(() => {
    fetchReservations(setReservations);
  }, []);

  return (
    <div>{
      currentUser.isAdmin ? <Admin /> : 
    
    <ThemeProvider theme={DefaultTheme}>
      <CssBaseline />
      <AppBar position="sticky" color={themeMode === "dark" ? "primary" : "secondary"}>
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
            pb: 6,
          }}
        >
          <Container bgcolor='background.paper' maxWidth="sm">
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
        <Container sx={{ bgcolor: 'background.paper', py: 8 }} maxWidth="md">
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
                      <Link to={`/${reservations.id}/spacedetails/${reservations.spaceId}`} underline="none">
                        <Button startIcon={<VisibilityIcon />} size="small" variant="outlined" color={themeMode === "dark" ? "primary" : "secondary"}>View</Button>
                        </Link>
                        <Link to={`/${id}/editspace/${reservations.id}`} style={{ textDecoration: 'none' }}>
                        <Button startIcon={<EditIcon />} size="small" variant="contained" color={themeMode === "dark" ? "primary" : "secondary"}>Edit</Button>
                        </Link>
                      </Stack>
                    </CardActions>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        </Paper>
      </main>
    </ThemeProvider>
}</div>);
}