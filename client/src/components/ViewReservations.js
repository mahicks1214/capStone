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
import { ThemeProvider } from '@mui/material/styles';
import DefaultTheme from './DefaultTheme';
import DarkTheme from './DarkTheme';
import { useThemeContext } from './ThemeContext';
import EditIcon from '@mui/icons-material/Edit';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from './UserContext';

function deleteReservation(id, userId, navigate, setDataReceived) {
fetch(`http://localhost:8080/reservations/delete/${id}`, {
    method: "DELETE",
})
    .then((response) => {
    setDataReceived(true);
    navigate(`/Reservations`);
    })
}

export default function ViewReservations() {
  const [reservations, setReservations] = useState([]);
  const [view, setView] = React.useState(null);
  const [dataReceived, setDataReceived] = useState(true);
  const { themeMode } = useThemeContext();
  const { currentUser } = useUserContext();
  const navigate = useNavigate();
  const handleView = (event) => {
    setView(event.currentTarget);
};

  useEffect(() => {
    fetch(`http://localhost:8080/users/${currentUser.id}/reservations`)
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
  }, [dataReceived]);

  return dataReceived ? (
    <ThemeProvider theme={themeMode === "dark" ? DarkTheme : DefaultTheme}>
      <CssBaseline />
      <AppBar position="sticky" color={themeMode === "dark" ? "primary" : "secondary"}>
        <Typography sx="" variant="h6" color="inherit" align="left" noWrap>
          View Reservations
        </Typography>
      </AppBar>
      <main>
      <Paper bgcolor='background.paper' elevation={0} maxWidth="lg">
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
              Reservations
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
          <Grid container spacing={4}>
            {reservations.map((reservation) => (
              
              <Grid item key={reservation.id} xs={12}>
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
                    image={`https://source.unsplash.com/random?wallpapers&id=${reservation.id}`}
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1, justifyContent: 'space-between', alignItems: 'center', marginLeft: '16px' }}>
                    <CardContent sx={{ padding: '16px' }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {reservation.meetingName}
                      </Typography>
                      <Typography>
                        Created By User# - {reservation.userId}
                      </Typography>
                      <Typography>
                        Room Booked - {reservation.spaceId}
                      </Typography>
                      <Typography>
                        Start Time - {reservation.meetingStart}
                      </Typography>
                      <Typography>
                        Meeting Length - {reservation.meetingStart}
                      </Typography>
                      <Typography>
                        Attendees - {reservation.attendees}
                      </Typography>
                      <Typography>
                        Meeting Description - {reservation.meetingDescription}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Stack direction="column" spacing={1}>
                        <Button startIcon={<EditIcon />} size="small" sx={{width: "100px"}} variant="outlined" color={themeMode === "dark" ? "primary" : "secondary"} onClick={() => {navigate(`/${currentUser.id}/Reservations/editReservation/${reservation.id}`)}}>Edit</Button>
                        <Button startIcon={<PersonRemoveIcon />} size="small" variant="contained" color={themeMode === "dark" ? "primary" : "secondary"} onClick={() => {deleteReservation(reservation.id, currentUser.id, navigate, setDataReceived)}}>Delete</Button>
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
  ) : null;
}