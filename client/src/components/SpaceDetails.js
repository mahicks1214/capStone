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
import { Link, useParams } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import DefaultTheme from './DefaultTheme';
import DarkTheme from './DarkTheme';
import { useThemeContext } from './ThemeContext';
import { useUserContext} from "./UserContext";
import EditIcon from '@mui/icons-material/Edit';


export default function SpaceDetails() {
  const [spaces, setSpaces] = useState([]);
  const { themeMode, capitalizeFirstLetter } = useThemeContext();
  const { currentUser } = useUserContext();
  const { spaceId } = useParams();

  function fetchSpaces(setSpaces) {
    fetch(`http://localhost:8080/spaces/${spaceId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setSpaces(data);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }

  useEffect(() => {
    fetchSpaces(setSpaces);
  }, []);

  return (
    <ThemeProvider theme={themeMode === "dark" ? DarkTheme : DefaultTheme}>
      <CssBaseline />
      <AppBar position="sticky" color={themeMode === "dark" ? "primary" : "secondary"}>
        <Typography sx="" variant="h6" color="inherit" align="left" noWrap>
          Space Details
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
              Space Details
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
                Space Details are provided below.
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
              <Grid item key={spaces.reservationId} xs={12}>
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
                    image={`https://source.unsplash.com/random?wallpapers&id=${spaces.id}`}
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1, justifyContent: 'space-between', alignItems: 'center', marginLeft: '16px' }}>
                    <CardContent sx={{ padding: '16px' }}>
                      <Typography gutterBottom variant="h5" component="h2" fontWeight='fontWeightBold'>
                        {capitalizeFirstLetter(spaces.spaceName)}
                      </Typography>
                      <Typography>
                        <Box component="span" fontWeight='fontWeightBold'>Meeting Space:</Box> {spaces.spaceNumber}
                      </Typography>
                      <Typography>
                        <Box component="span" fontWeight='fontWeightBold'>Building Name:</Box> {spaces.buildingName}
                      </Typography>
                      <Typography>
                        <Box component="span" fontWeight='fontWeightBold'>Building Number:</Box> {spaces.buildingNumber}
                      </Typography>
                      <Typography>
                        <Box component="span" fontWeight='fontWeightBold'>Available Seating:</Box> {spaces.seating}
                      </Typography>
                      <Typography>
                        <Box component="span" fontWeight='fontWeightBold'>Eqipment:</Box> {spaces.equipment}
                      </Typography>
                      <Typography>
                        <Box component="span" fontWeight='fontWeightBold'>Classification:</Box> {spaces.classification}
                      </Typography>
                      <Typography>
                        <Box component="span" fontWeight='fontWeightBold'>Network:</Box> {spaces.network}
                      </Typography>
                      <Typography>
                        <Box component="span" fontWeight='fontWeightBold'>Trainer:</Box> {spaces.isTrainer ? 'Yes' : 'No'}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Stack direction="column" spacing={1}>
                        { currentUser.isAdmin ?
                        <Link to={`/${currentUser.id}/spaces/EditReservation/${spaces.spacesId}`} style={{ textDecoration: 'none' }}>
                        <Button startIcon={<EditIcon />} size="small" variant="contained" color={themeMode === "dark" ? "primary" : "secondary"}>Edit</Button>
                        </Link>
                        : null }
                      </Stack>
                    </CardActions>
                  </Box>
                </Card>
              </Grid>
          </Grid>
        </Container>
        </Paper>
      </main>
    </ThemeProvider>
  )
};