import React, { useState } from 'react';
import {
    Container, Grid, Card, CardActions, CardContent,
    Button, Typography, TextField, Box
} from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Switch from '@mui/material/Switch';
import DefaultTheme from "./DefaultTheme";
import DarkTheme from "./DarkTheme";
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import { ThemeProvider } from '@emotion/react';
import { useThemeContext } from './ThemeContext';


const CreateReservation = ({ spaces }) => {    
    const navigate = useNavigate();      
    const { themeMode } = useThemeContext();


    const handleSubmit = (event) => {
        event.preventDefault();
        var formData = new FormData(event.currentTarget)

        let editReservation = {

            meetingName: (formData.get('meetingName') === null ? "" :
                formData.get('meetingName').toString().length === 0 ? "" : formData.get('meetingName')),

            spaceNumber: (formData.get('spaceNumber') === null ? "" :
                formData.get('spaceNumber').toString().length === 0 ? "" : formData.get('spaceNumber')),

            meetingDescription: (formData.get('meetingDescription') === null ? "" :
                formData.get('meetingDescription').toString().length === 0 ? "" : formData.get('meetingDescription')),

            attendees: (formData.get('attendees') === null ? "" :
                formData.get('attendees').toString().length === 0 ? "" :
                formData.get('attendees').toString().length === 0 ? "" : formData.get('attendees')),

            meetingStart: (formData.get('meetingStart') === null ? "" :
                formData.get('meetingStart').toString().length === 0 ? "" : formData.get('meetingStart')),

            meetingDuration: (formData.get('meetingDuration') === null ? "" :
                formData.get('meetingDuration').toString().length === 0 ? "" : formData.get('meetingDuration')),


<<<<<<< HEAD:client/src/components/Reservation.js
=======
const CreateReservation = ({ spaces }) => {
    const { userId, roomId, roomName } = useParams();
    const [meetingStart, setMeetingStart] = useState('');
    const [meetingDuration, setMeetingDuration] = useState('');
    const [meetingName, setMeetingName] = useState('');
    const [meetingDescription, setMeetingDescription] = useState('');
    const [attendees, setAttendees] = useState(['']);
>>>>>>> 55c4163 (Changed names to reflect CRUD operations and added some links.):client/src/components/CreateReservation.js

        };
        fetch('http://localhost:8080/reservations/create ', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editReservation),
        })
            .then((rawResponse) => {
                if (!rawResponse.ok) {
                    throw new Error(
                        `code: ${rawResponse.status}, status text: ${rawResponse.statusText}`
                    );
                }
                return rawResponse.json();
            })
            .then((response) => {
                navigate("/");
            })
            .catch((error) => {
                navigate("/");
            });

    };







    

return (
    <ThemeProvider theme={themeMode === "dark" ? DarkTheme : DefaultTheme}>
            <CssBaseline />
            <AppBar position="sticky" color={themeMode === "dark" ? "primary" : "secondary"}>
                <Typography sx="" variant="h6" color="inherit" align="left" noWrap>
                    Add Reservation
                </Typography>
            </AppBar>
            <Box sx={{ flexGrow: 1 }}>
                <div>
                    <center>
                        <Box
                            component="form"
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                '& .MuiTextField-root': { width: '25ch' },
                                color: themeMode.primary,
                            }}
                            onSubmit={handleSubmit}
                        >
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            height: 50,
                                        }}>
                                        <center>
                                            <h2>Create a new Reservation</h2>
                                        </center>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            '& .MuiTextField-root': { width: '25ch' },
                                        }}>
                                        <TextField sx={{ input: { color: themeMode.secondary } }} name="meetingName" label={'Meeting Name'} id="EditFormMeetingName" color={themeMode === "dark" ? "primary" : "secondary"} margin="normal" size="small" focused />
                                        <TextField sx={{ input: { color: themeMode.secondary } }} name="spaceNumber" label={'Space Number'} id="EditFormSpaceNumber" color={themeMode === "dark" ? "primary" : "secondary"} margin="normal" size="small" focused />
                                        <TextField sx={{ input: { color: themeMode.secondary } }} name="meetingDescription" label={'Meeting Description'} id="EditFormMeetingDescription" color={themeMode === "dark" ? "primary" : "secondary"} margin="normal" size="small" focused />
                                        <TextField sx={{ input: { color: themeMode.secondary } }} name="attendees" label={'Attendees'} id="EditFormAttendees" color={themeMode === "dark" ? "primary" : "secondary"} margin="normal" size="small" focused />
                                        <TextField sx={{ input: { color: themeMode.secondary } }} name="meetingStart" label={'Meeting Start'} id="EditFormMeetingStart" color={themeMode === "dark" ? "primary" : "secondary"} margin="normal" size="small" focused />                                        
                                        <TextField sx={{ input: { color: themeMode.secondary } }} name="meetingDuration" label={'Meeting Duration'} id="EditFormMeetingDuration" color={themeMode === "dark" ? "primary" : "secondary"} margin="normal" size="small" focused />                                                                               
                                        <Box
                                            sx={{
                                                padding: '5px'
                                            }}>
                                            <Button
                                                variant="contained"
                                                margin="normal"
                                                type="submit"
                                                color={themeMode === "dark" ? "primary" : "secondary"}
                                            >Add Reservation</Button>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </center>
                </div>
            </Box>
        </ThemeProvider>
);
};


export default CreateReservation;