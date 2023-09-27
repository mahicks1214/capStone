import React, { useEffect, useState } from 'react';
import {
    Container,
    Button,
    Box,
    Typography,
    Paper,
    Grid,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import { ThemeProvider } from '@mui/material/styles';
import DefaultTheme from './DefaultTheme';
import DarkTheme from './DarkTheme';
import { useThemeContext } from './ThemeContext';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { useUserContext } from './UserContext';


const DeleteReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [dataReceived, setDataReceived] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { themeMode } = useThemeContext();
    const { currentUser } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8080/reservations')
            .then((response) => response.json())
            .then((data) => {
                setReservations(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setIsLoading(false);
            });
    }, []);

    const handleAddReservation = () => {
        console.log('Adding a Reservation...');
        alert('You pressed "Add a Reservation"');
        navigate("/:userId/Reservation");
    };

    const handleRemoveReservations = (id) => {
        // Send a DELETE request to remove the space
        fetch(`http://localhost:8080/reservations/${id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                setReservations((prevReservations) => prevReservations.filter((reservation) => reservation.id !== id));
            })
            .catch((error) => {
                console.error('There was a problem with the DELETE operation:', error);
            });
    };

    const handleEditReservation = (id) => {
        console.log(`Editing reservation with ID: ${id}`);
        navigate(`/:userId/editreservation/${id}`);
    };

    return (
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
                                                    Room Number - {reservation.spaceId}
                                                </Typography>
                                                <Typography>
                                                    Meeting Description - {reservation.meetingDescription}
                                                </Typography>
                                                <Typography>
                                                    Attedning - {reservation.attendees}
                                                </Typography>
                                                <Typography>
                                                    Meeting Start Time - {reservation.meetingStart}
                                                </Typography>
                                                <Typography>
                                                    Hours of Duration - {reservation.meetingDuration}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>

                                                <Stack direction="column" spacing={1}>
                                                    <Button startIcon={<EditIcon />} size="small" sx={{ width: "100px" }} variant="outlined" color={themeMode === "dark" ? "primary" : "secondary"} onClick={() => handleEditReservation(reservation.id) }>Edit</Button>
                                                    <Button startIcon={<PersonRemoveIcon />} size="small" variant="contained" color={themeMode === "dark" ? "primary" : "secondary"} onClick={() => handleRemoveReservations(reservation.id)}>Delete</Button>
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
    );
}

export default DeleteReservations;
