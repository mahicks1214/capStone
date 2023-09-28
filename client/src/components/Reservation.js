import React, { useState } from 'react';
import {
    Container, Grid, Card, CardActions, CardContent,
    Button, Typography, TextField, Box
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import DefaultTheme from "./DefaultTheme";
import DarkTheme from "./DarkTheme";
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import { ThemeProvider } from '@emotion/react';
import { useThemeContext } from './ThemeContext';

const CreateReservation = () => { 
    const [space, setSpace] = useState([]);
    const [dataReceived, setDataReceived] = useState(false);
    const navigate = useNavigate();      
    const { themeMode } = useThemeContext();
    const { userId, spaceId } = useParams();

    const handleSubmit = (event) => {
        event.preventDefault();
        var formData = new FormData(event.currentTarget)

        let editReservation = {

            //{
                "userId": userId,
                "spaceId": spaceId,
                "meetingName": (formData.get('meetingName') === null ? "" :
                                 formData.get('meetingName').toString().length === 0 ? "" : formData.get('meetingName')),
                "meetingDescription": (formData.get('meetingDescription') === null ? "" :
                                 formData.get('meetingDescription').toString().length === 0 ? "" : formData.get('meetingDescription')),
                "attendees": (formData.get('attendees') === null ? "" :
                             formData.get('attendees').toString().length === 0 ? "" : formData.get('attendees')),
                "meetingStart": (formData.get('meetingStart') === null ? "" :
                                 formData.get('meetingStart').toString().length === 0 ? "" : new Date(formData.get('meetingStart')).toISOString()),
                "meetingDuration": (formData.get('meetingDuration') === null ? "" :
                                 formData.get('meetingDuration').toString().length === 0 ? "" : formData.get('meetingDuration'))
        };
        fetch('http://localhost:8080/reservations/create', {
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
                navigate(`/${userId}/Spaces`);
            })
            .catch((error) => {
                navigate(`/${userId}/Spaces`);
            });

    };

    useEffect(() => {
        fetch(`http://localhost:8080/spaces/${spaceId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setSpace(data);
                setDataReceived(true);
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            })
    }, [])

return dataReceived ? (
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
                                        <TextField sx={{ input: { color: themeMode.secondary } }} name="meetingDescription" label={'Meeting Description'} id="EditFormMeetingDescription" color={themeMode === "dark" ? "primary" : "secondary"} margin="normal" size="small" focused />
                                        <TextField sx={{ input: { color: themeMode.secondary } }} name="attendees" label={'Attendees'} id="EditFormAttendees" color={themeMode === "dark" ? "primary" : "secondary"} margin="normal" size="small" focused />
                                        <TextField sx={{ input: { color: themeMode.secondary } }} name="meetingStart" label={'Meeting Start'} id="EditFormMeetingStart" color={themeMode === "dark" ? "primary" : "secondary"} placeholder="mm-dd-yyyy hh:mm" margin="normal" size="small" focused />                                        
                                        <TextField sx={{ input: { color: themeMode.secondary } }} name="meetingDuration" label={'Meeting Duration'} id="EditFormMeetingDuration" color={themeMode === "dark" ? "primary" : "secondary"} placeholder="hh" margin="normal" size="small" focused />                                                                               
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
) : <span>The space data was not retrieved.</span>;
};


export default CreateReservation;