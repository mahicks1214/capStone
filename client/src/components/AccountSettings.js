import { Button, Typography, Box } from "@mui/material";
import * as React from "react";
import TextField from '@mui/material/TextField';
import AppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import { useUserContext } from "./UserContext";
import { useState } from "react";
import DefaultTheme from "./DefaultTheme";
import { ThemeProvider } from '@emotion/react';
import { useThemeContext } from './Context';
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

// const colorPalette = {
//     primaryDark: "#79955a",
//     primary: "light blue",
//     secondary: "#ffd54f",
//     tertiary: {themeMode.secondary},
//     neutral: {themeMode.secondary},
// };
// const StyledLink = styled(Link)({
//     textDecoration: "none",
//     color: colorPalette.tertiary,
//     marginLeft: "1rem",
//     "&:hover": {
//         color: colorPalette.secondary,
//     },
// });
// const StyledAppBar = styled(AppBar)({
//     backgroundColor: colorPalette.primaryDark,
// });

export default function AccountSettings() {
    const navigate = useNavigate();
    const { currentUser, setCurrentUser } = useUserContext();
    const [isAdmin, setIsAdmin] = useState(currentUser.isAdmin);
    const label = { inputProps: { 'aria-label': 'Administrator?' } };
    const handleChange = (event) => {setIsAdmin(event.target.checked); };

    const { themeMode, setThemeMode } = useThemeContext();

    const { isAuthenticated, logout } = useAuth0();
    const [returnedUser, setReturnedUser] = useState(currentUser);
    useEffect(() => {
        if (isAuthenticated === true) {
            fetch(`http://localhost:8080/users/${currentUser.id}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    setReturnedUser(data)
                })
                .catch((error) => { console.log(error) })
        }
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        var formData = new FormData(event.currentTarget)

        let editAccount = {
            firstName: (formData.get('firstName') === null ? returnedUser.firstName :
                formData.get('firstName').toString().length === 0 ? returnedUser.firstName : formData.get('firstName')),

            lastName: (formData.get('lastName') === null ? returnedUser.lastName :
                formData.get('lastName').toString().length === 0 ? returnedUser.lastName : formData.get('lastName')),

            userName: (formData.get('userName') === null ? returnedUser.userName :
                formData.get('userName').toString().length === 0 ? returnedUser.userName : formData.get('userName')),

            password: (formData.get('password') === null ? returnedUser.password :
                formData.get('password').toString().length === 0 ? returnedUser.password :
                    formData.get('password') !== formData.get('confirmpassword') ? returnedUser.password : formData.get('password')),

            email: returnedUser.email,

            rank: (formData.get('rank') === null ? returnedUser.rank :
                formData.get('rank').toString().length === 0 ? returnedUser.rank : formData.get('rank')),

            isAdmin: isAdmin

        };
        console.log(editAccount);
        fetch(`http://localhost:8080/users/update/${currentUser.id}`, {
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
            .then(response => {
                setCurrentUser(editAccount);
                logout({ logoutParams: { returnTo: window.location.origin } });
            })
            .catch((error) => navigate("/"));

    };

    return (
        <ThemeProvider theme={DefaultTheme}>
            <Box sx={{ flexGrow: 1 }}>
                <div>
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
                            <Grid item xs={3}>
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
                                    <TextField sx={{ input: { color: themeMode.secondary } }} name="firstName" label={'First Name'} id="EditFormfirstName" color={themeMode.secondary} margin="normal" defaultValue={returnedUser.firstName} focused />
                                    <TextField sx={{ input: { color: themeMode.secondary } }} name="lastName" label={'Last Name'} id="EditFormlastName" color={themeMode.secondary} margin="normal" defaultValue={returnedUser.lastName} focused />
                                    <TextField sx={{ input: { color: themeMode.secondary } }} name="userName" label={'Username'} id="EditFormUsername" color={themeMode.secondary} margin="normal" defaultValue={returnedUser.userName} focused />
                                    <TextField sx={{ input: { color: themeMode.secondary } }} name="password" label={'Password'} id="EditFormPassword" color={themeMode.secondary} margin="normal" type="password" defaultValue={returnedUser.password} focused />
                                    <TextField sx={{ input: { color: themeMode.secondary } }} name="confirmpassword" label={'Confirm Password'} id="EditFormConfirmPassword" color={themeMode.secondary} margin="normal" type="password" defaultValue={returnedUser.password} focused />
                                    <TextField sx={{ input: { color: themeMode.secondary } }} name="rank" label={'Rank'} id="EditFormRank" color={themeMode.secondary} margin="normal" defaultValue={returnedUser.rank} focused />
                                    <span>Administrator?</span>
                                    <Switch {...label} checked={isAdmin} onChange={handleChange} />
                                    <Box
                                        sx={{
                                            padding: '5px'
                                        }}>
                                        <Button
                                            variant="contained"
                                            margin="normal"
                                            type="submit"
                                            color={themeMode.secondary}
                                        >Edit Account Info</Button>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
            </Box>
        </ThemeProvider>
    );
};