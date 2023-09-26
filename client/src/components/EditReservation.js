import React, { useEffect, useState } from 'react';
import {
    Container, Grid, Card, CardActions, CardContent,
    Button, Typography, TextField, Box
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const EditReservation = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [reservation, setReservation] = useState({
        userId: '',
        roomId: '',
        meetingName: '',
        meetingDescription: '',
        attendees: '',
        meetingStart: '',
        meetingDuration: ''
    });

    useEffect(() => {
        fetch(`http://localhost:8080/reservations/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setReservation(data);
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, [id]);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        fetch(`http://localhost:8080/reservations/update/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reservation),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                alert(`Reservation with ID ${id} updated successfully!`);
                navigate(`/reservations/${id}`);
            })
            .catch((error) => {
                console.error('There was a problem with the PATCH operation:', error);
            });
    };

    return (
        <Container>
            <Box mt={12}>
                <Grid container justifyContent="center">
                    <Grid item xs={12} sm={6}>
                        <Card sx={{ mb: 3 }}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Edit Reservation
                                </Typography>
                                <form onSubmit={handleFormSubmit}>
                                    <Grid container spacing={2}>
                                    
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                id="meetingName"
                                                label="Meeting Name"
                                                variant="outlined"
                                                value={reservation.meetingName}
                                                onChange={(e) => setReservation({ ...reservation, meetingName: e.target.value })}
                                            />
                                        </Grid>
                                        
                                    </Grid>
                                    <CardActions>
                                        <Button
                                            fullWidth
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            sx={{ ml: 1, boxShadow: '2px 2px 5px rgba(0,0,0,0.3)', mt: 2 }}
                                        >
                                            Save Changes
                                        </Button>
                                    </CardActions>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default EditReservation;
