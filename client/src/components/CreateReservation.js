import React, { useState } from 'react';
import {
    Container, Grid, Card, CardActions, CardContent,
    Button, Typography, TextField, Box
} from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';


const CreateReservation = ({ spaces }) => {
    const { userId, roomId, roomName } = useParams();
    const [meetingStart, setMeetingStart] = useState('');
    const [meetingDuration, setMeetingDuration] = useState('');
    const [meetingName, setMeetingName] = useState('');
    const [meetingDescription, setMeetingDescription] = useState('');
    const [attendees, setAttendees] = useState(['']);

    const handleSubmit = () => {
        const data = {
            userId: userId,
            roomId: roomId,
            meetingName: meetingName,
            meetingDescription: meetingDescription,
            attendees: attendees,
            meetingStart: meetingStart,
            meetingDuration: meetingDuration
        };

        console.log('reservation data entry:', data);

        fetch('http://localhost:8080/reservations/create ', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                alert('Reservation added successfully!');
            })
            .catch((error) => {
                console.error('There was a problem with the POST operation:', error);
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
                                    Make a reservation in the {roomName} Space!
                                </Typography>

                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        {/* meetingStart */}
                                        <TextField
                                            fullWidth
                                            id="meetingStart"
                                            label="Meeting Start"
                                            variant="outlined"
                                            placeholder="YYYY-MM-DD HH:mm"
                                            type="datetime-local"
                                            value={meetingStart}
                                            onChange={(e) => setMeetingStart(e.target.value)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        {/* meetingDuration */}
                                        <TextField
                                            fullWidth
                                            id="meetingDuration"
                                            label="Meeting Duration (in minutes)"
                                            variant="outlined"
                                            placeholder="60"
                                            type="number"
                                            value={meetingDuration}
                                            onChange={(e) => setMeetingDuration(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        {/* meetingName */}
                                        <TextField
                                            fullWidth
                                            id="meetingName"
                                            label="Meeting Name"
                                            placeholder="Enter Meeting Name"
                                            variant="outlined"
                                            value={meetingName}
                                            onChange={(e) => setMeetingName(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        {/* attendees */}
                                        <TextField
                                            fullWidth
                                            id="attendees"
                                            label="Attendees"
                                            placeholder="Jane Doe, Jon Doe, etc."
                                            variant="outlined"
                                            value={attendees}
                                            onChange={(e) => setAttendees(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        {/* description */}
                                        <TextField
                                            fullWidth
                                            id="Description"
                                            label="Description"
                                            placeholder="Brief description of the meeting"
                                            variant="outlined"
                                            value={meetingDescription}
                                            onChange={(e) => setMeetingDescription(e.target.value)}
                                        />
                                    </Grid>

                                </Grid>
                            </CardContent>
                            <CardActions>
                                <Button
                                    fullWidth
                                    onClick={handleSubmit}
                                    variant="contained"
                                    color="primary"
                                    component={RouterLink}
                                    to={`/userhomepage`}
                                    sx={{ ml: 1, boxShadow: '2px 2px 5px rgba(0,0,0,0.3)', mt: 2 }}
                                >
                                    Make Reservation
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};


export default CreateReservation;