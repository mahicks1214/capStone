import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
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
import { Link } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import DefaultTheme from './DefaultTheme';
import DarkTheme from './DarkTheme';
import { useThemeContext } from './ThemeContext';
import { useUserContext} from "./UserContext";
import EditIcon from '@mui/icons-material/Edit';
import PostAddIcon from '@mui/icons-material/PostAdd';

function fetchReservations(setReservations) {
  fetch('http://localhost:8080/spaces')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      setReservations(data);
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

export default function Spaces() {
  const [spaces, setReservations] = useState([]);
  const { themeMode, capitalizeFirstLetter } = useThemeContext();
  const { currentUser } = useUserContext();
  // Brought-in Auth0 context
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    fetchReservations(setReservations);
  }, []);

  return (
    <ThemeProvider theme={themeMode === "dark" ? DarkTheme : DefaultTheme}>
      <CssBaseline />
      <AppBar position="sticky" color={themeMode === "dark" ? "primary" : "secondary"}>
        <Typography sx="" variant="h6" color="inherit" align="left" noWrap>
          Available Spaces
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
          <Container bgcolor='background.paper' maxWidth="lg">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Available Spaces
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Available Spaces are provided below. Login or Sign Up to reserve your Space!
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
        <Container sx={{ bgcolor: 'background.paper', py: 8 }} maxWidth="lg">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {spaces.map((space) => (
              <Grid item key={space.id} xs={12}>
                <Link to={`/Spaces/${space.id}`} style={{ textDecoration: 'none' }}>
                <Card sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px',
                  transition: 'transform .2s', '&:hover': { transform: 'scale(1.02)' },
                  bgcolor: 'backgound.paper'
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
                    image={`https://source.unsplash.com/random?wallpapers&id=${space.id}`}
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1, justifyContent: 'space-between', alignItems: 'center', marginLeft: '16px' }}>
                    <CardContent sx={{ padding: '16px' }}>
                      <Typography gutterBottom variant="h5" component="h2" fontWeight='fontWeightBold'>
                        {capitalizeFirstLetter(space.spaceName)}
                      </Typography>
                      <Typography>
                        <Box component="span" fontWeight='fontWeightBold'>Meeting Space:</Box> {space.spaceNumber}
                      </Typography>
                      <Typography>
                        <Box component="span" fontWeight='fontWeightBold'>Building Name:</Box> {space.buildingName}
                      </Typography>
                      <Typography>
                        <Box component="span" fontWeight='fontWeightBold'>Building Number:</Box> {space.buildingNumber}
                      </Typography>
                      <Typography>
                        <Box component="span" fontWeight='fontWeightBold'>Available Seating:</Box> {space.seating}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Stack direction="column" spacing={1}>
                        { currentUser.isAdmin ?
                        <Link to={`/${currentUser.id}/Spaces/${space.id}`} style={{ textDecoration: 'none' }}>
                          <Button startIcon={<EditIcon />} size="small" variant="outlined" color={themeMode === "dark" ? "primary" : "secondary"}>Edit</Button>
                        </Link>
                        : null }
                        { isAuthenticated ?
                        <Link to={`/${currentUser.id}/Reservations/CreateReservation/${space.id}`} style={{ textDecoration: 'none' }}>
                          <Button startIcon={<PostAddIcon />} size="small" variant="contained" color={themeMode === "dark" ? "primary" : "secondary"}>Book!</Button>
                        </Link>
                        : null }
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
  )
};