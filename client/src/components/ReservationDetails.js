import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import DefaultTheme from './DefaultTheme';
import DarkTheme from './DarkTheme';
import { useThemeContext } from './ThemeContext';
import { useParams, Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';

function fetchReservationDetails(id, setReservationDetails) {
  fetch(`http://localhost:8080/reservations/${id}`)
    .then((response) => {
        console.log("Raw response:", response);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log("Fetched reservation details:", data);
      console.log("Parsed data:", data);
      setReservationDetails(data);
    })
    .catch((error) => {
        console.error('Fetching error:', error);
      console.error('There was a problem with the fetch operation:', error);
    });
}


function ReservationDetails() {
    const [reservationDetails, setReservationDetails] = useState(null);
    const { themeMode } = useThemeContext();
    const { reservationId } = useParams();
  
    useEffect(() => {
      fetchReservationDetails(reservationId, setReservationDetails);
    }, [reservationId]);
  
    if (!reservationDetails) {
      return <Typography align="center">Loading reservation details...</Typography>;
    }
    
    return (
      <ThemeProvider theme={themeMode === "dark" ? DarkTheme : DefaultTheme}>
        <AppBar position="sticky" color={themeMode === "light" ? "primary" : "secondary"}>
          <Typography variant="h6" color="inherit" noWrap>
            Reservation Details
          </Typography>
        </AppBar>
        <main>
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Card>
                <CardContent>
                  <Typography variant="h4" component="h1">
                    Meeting - {reservationDetails.meetingName}
                  </Typography>
                  <Typography variant="h6">
                    Space - {reservationDetails.spaceId}
                  </Typography>
                  <Typography variant="h6">
                    Description - {reservationDetails.meetingDescription}
                  </Typography>
                  <Typography variant="h6">
                    Start Time - {reservationDetails.meetingStart}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link to={`/editReservation/${reservationId}`}>
                    <Button startIcon={<EditIcon />} variant="contained" color="primary">Edit</Button>
                  </Link>
                </CardActions>
              </Card>
            </Container>
          </Box>
        </main>
      </ThemeProvider>
    );
}

export default ReservationDetails;

