import { Button, Typography, Box } from "@mui/material";
import * as React from "react";
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import { useState } from "react";
import DefaultTheme from "./DefaultTheme";
import DarkTheme from "./DarkTheme";
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import { ThemeProvider } from '@emotion/react';
import { useThemeContext } from './ThemeContext';

export default function CreateUser() {
    const navigate = useNavigate();
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
            firstName: (formData.get('firstName') === null ? "" :
                formData.get('firstName').toString().length === 0 ? "" : formData.get('firstName')),

            lastName: (formData.get('lastName') === null ? "" :
                formData.get('lastName').toString().length === 0 ? "" : formData.get('lastName')),

            userName: (formData.get('userName') === null ? "" :
                formData.get('userName').toString().length === 0 ? "" : formData.get('userName')),

            password: (formData.get('password') === null ? "" :
                formData.get('password').toString().length === 0 ? "" :
                    formData.get('password') !== formData.get('confirmpassword') ? "" : formData.get('password')),

            email: (formData.get('email') === null ? "" :
                formData.get('email').toString().length === 0 ? "" : formData.get('email')),

            rank: (formData.get('rank') === null ? "" :
                formData.get('rank').toString().length === 0 ? "" : formData.get('rank')),

            isAdmin: isAdmin

        };
        fetch(`http://localhost:8080/users/create`, {
            method: "POST",
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
                    Create User
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
                                            <h2>Create new user</h2>
                                        </center>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            '& .MuiTextField-root': { width: '25ch' },
                                        }}>
                                        <TextField sx={{ input: { color: themeMode.secondary } }} name="firstName" label={'First Name'} id="EditFormfirstName" color={themeMode === "dark" ? "primary" : "secondary"} margin="normal" size="small" focused />
                                        <TextField sx={{ input: { color: themeMode.secondary } }} name="lastName" label={'Last Name'} id="EditFormlastName" color={themeMode === "dark" ? "primary" : "secondary"} margin="normal" size="small" focused />
                                        <TextField sx={{ input: { color: themeMode.secondary } }} name="userName" label={'Username'} id="EditFormUsername" color={themeMode === "dark" ? "primary" : "secondary"} margin="normal" size="small" focused />
                                        <TextField sx={{ input: { color: themeMode.secondary } }} name="email" label={'Email'} id="EditFormEmail" color={themeMode === "dark" ? "primary" : "secondary"} margin="normal" size="small" focused />
                                        <TextField sx={{ input: { color: themeMode.secondary } }} name="password" label={'Password'} id="EditFormPassword" color={themeMode === "dark" ? "primary" : "secondary"} margin="normal" type="password" size="small" focused />
                                        <TextField sx={{ input: { color: themeMode.secondary } }} name="confirmpassword" label={'Confirm Password'} id="EditFormConfirmPassword" color={themeMode === "dark" ? "primary" : "secondary"} margin="normal" type="password" size="small" focused />
                                        <TextField sx={{ input: { color: themeMode.secondary } }} name="rank" label={'Rank'} id="EditFormRank" color={themeMode === "dark" ? "primary" : "secondary"} margin="normal" size="small" focused />
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
                                            >Create User</Button>
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