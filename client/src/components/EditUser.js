import { Button, Typography, Box } from "@mui/material";
import * as React from "react";
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import { useState, useEffect } from "react";
import DefaultTheme from "./DefaultTheme";
import DarkTheme from "./DarkTheme";
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import { ThemeProvider } from '@emotion/react';
import { useThemeContext } from './ThemeContext';
import { useParams } from 'react-router-dom';

export default function EditUser() {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [user, setUser] = useState([]);
    const [dataReceived, setDataReceived] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const label = { inputProps: { 'aria-label': 'Administrator?' } };
    const handleChange = (event) => {
        setIsAdmin(event.target.checked);
    };

    const { themeMode } = useThemeContext();
    const handleSubmit = (event) => {
        event.preventDefault();
        var formData = new FormData(event.currentTarget)

        let editAccount = {
            firstName: (formData.get('firstName') === null ? user.firstName :
                formData.get('firstName').toString().length === 0 ? user.firstName : formData.get('firstName')),

            lastName: (formData.get('lastName') === null ? user.lastName :
                formData.get('lastName').toString().length === 0 ? user.lastName : formData.get('lastName')),

            userName: (formData.get('userName') === null ? user.userName :
                formData.get('userName').toString().length === 0 ? user.userName : formData.get('userName')),

            password: (formData.get('password') === null ? user.password :
                formData.get('password').toString().length === 0 ? user.password :
                    formData.get('password') !== formData.get('confirmpassword') ? user.password : formData.get('password')),

            email: user.email,

            rank: (formData.get('rank') === null ? user.rank :
                formData.get('rank').toString().length === 0 ? user.rank : formData.get('rank')),

            isAdmin: isAdmin

        };
        fetch(`http://localhost:8080/users/update/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editAccount)
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
                navigate("/users");
            })
            .catch((error) => {
                navigate("/users");
            });

    };

    useEffect(() => {
        fetch(`http://localhost:8080/users/${userId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setUser(data);
                setDataReceived(true);
                setIsAdmin(data.isAdmin);
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
                    Edit User
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
                                            <h2>Edit Account Information</h2>
                                        </center>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            '& .MuiTextField-root': { width: '25ch' },
                                        }}>
                                        <TextField sx={{ input: { color: themeMode.secondary } }} name="firstName" label={'First Name'} id="EditFormfirstName" color={themeMode === "dark" ? "primary" : "secondary"} margin="normal" defaultValue={user.firstName} size="small" focused />
                                        <TextField sx={{ input: { color: themeMode.secondary } }} name="lastName" label={'Last Name'} id="EditFormlastName" color={themeMode === "dark" ? "primary" : "secondary"} margin="normal" defaultValue={user.lastName} size="small" focused />
                                        <TextField sx={{ input: { color: themeMode.secondary } }} name="userName" label={'Username'} id="EditFormUsername" color={themeMode === "dark" ? "primary" : "secondary"} margin="normal" defaultValue={user.userName} size="small" focused />
                                        <TextField sx={{ input: { color: themeMode.secondary } }} name="password" label={'Password'} id="EditFormPassword" color={themeMode === "dark" ? "primary" : "secondary"} margin="normal" type="password" defaultValue={user.password} size="small" focused />
                                        <TextField sx={{ input: { color: themeMode.secondary } }} name="confirmpassword" label={'Confirm Password'} id="EditFormConfirmPassword" color={themeMode === "dark" ? "primary" : "secondary"} margin="normal" type="password" defaultValue={user.password} size="small" focused />
                                        <TextField sx={{ input: { color: themeMode.secondary } }} name="rank" label={'Rank'} id="EditFormRank" color={themeMode === "dark" ? "primary" : "secondary"} margin="normal" defaultValue={user.rank} size="small" focused />
                                        <span>Administrator?</span>
                                        <Switch {...label} checked={isAdmin} onChange={handleChange} color={themeMode === "dark" ? "primary" : "secondary"} />
                                        <Box
                                            sx={{
                                                padding: '5px'
                                            }}>
                                            <Button
                                                variant="contained"
                                                margin="normal"
                                                type="submit"
                                                color={themeMode === "dark" ? "primary" : "secondary"}
                                            >Edit Account Info</Button>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </center>
                </div>
            </Box>
        </ThemeProvider>
    ) : <span>The user's data was not retrieved.</span>;
};