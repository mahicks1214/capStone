import React, { useEffect, useState } from 'react';
import {
    Container,
    Button,
    Box,
    Typography,
    Paper,
    Grid,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Divider,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const DeleteReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
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

    const handleAdmin = () => {
        console.log('Moving to Admin Main Page');
        alert('Moving to Admin Main Page');
         navigate('/:userId/Admin');
    };

    const handleAddReservation = () => {
        console.log('Adding a Reservation...');
        alert('You pressed "Add a Reservation"');
         navigate("/:userId/reservations");
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

    const handleEditSpace = (id) => {        
        console.log(`Editing space with ID: ${id}`);
        navigate(`/editspace/${id}`);
    };

    return (
        <Container maxWidth="md" style={{ marginTop: '40px' }}>
            <Box mt={12} sx={{ textAlign: 'center' }}>
                <Grid container justifyContent="center">
                    <Grid item xs={12} sm={6}>
                        <Typography gutterBottom variant="h5" component="div">
                                    Manage Reservations
                        </Typography>
                        <Button
                            fullWidth
                            onClick={handleAdmin}
                            variant="contained"
                            color="primary"
                            sx={{ ml: 1, boxShadow: '2px 2px 5px rgba(0,0,0,0.3)', mt: 2 }}
                        >
                            Admin Main Page
                        </Button>
                        <Button
                            fullWidth
                            onClick={handleAddReservation}
                            variant="contained"
                            color="primary"
                            sx={{ ml: 1, boxShadow: '2px 2px 5px rgba(0,0,0,0.3)', mt: 2 }}
                        >
                            Create New Reservation
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            <Paper elevation={5} style={{ padding: '20px' }}>
                {isLoading ? (
                    <Grid container justifyContent="center" alignItems="center" style={{ height: '200px' }}>
                        <CircularProgress color="primary" />
                    </Grid>
                ) : (
                    <List>
                        {reservations.map((reservation, index) => (
                            <React.Fragment key={reservation.id}>
                                <ListItem>
                                    <ListItemText
                                        primaryTypographyProps={{ variant: 'h6', color: 'textPrimary' }}
                                        primary={`Held in Room: ${reservation.roomId} Meeting Name: ${reservation.meetingName}`}
                                        secondary={`Meeting Description: ${reservation.meetingDescription} Start Time: ${reservation.meetingStart}`}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" color="primary" onClick={() => handleEditSpace(reservation.id)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton edge="end" color="error" onClick={() => handleRemoveReservations(reservation.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                {index !== reservations.length - 1 && <Divider />}
                            </React.Fragment>
                        ))}
                    </List>
                )}
            </Paper>
        </Container>
    );
};

export default DeleteReservations;
