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
    const { currentUser } = useUserContext();
    const [isAdmin, setIsAdmin] = useState(currentUser.isAdmin);
    const label = { inputProps: { 'aria-label': 'Administrator?' } };
    const handleChange = (event) => {
        setIsAdmin(event.target.checked);
    };

    const { themeMode, setThemeMode } = useThemeContext();

    const handleSubmit = (event) => {
        event.preventDefault();
        var formData = new FormData(event.currentTarget)

        let editAccount = {
            firstName: (formData.get('firstName') === null ? currentUser.firstName :
                formData.get('firstName').toString().length === 0 ? currentUser.firstName : formData.get('firstName')),

            lastName: (formData.get('lastName') === null ? currentUser.lastName :
                formData.get('lastName').toString().length === 0 ? currentUser.lastName : formData.get('lastName')),

            userName: (formData.get('userName') === null ? currentUser.userName :
                formData.get('userName').toString().length === 0 ? currentUser.userName : formData.get('userName')),

            password: (formData.get('password') === null ? currentUser.password :
                formData.get('password').toString().length === 0 ? currentUser.password :
                    formData.get('password') !== formData.get('confirmpassword') ? currentUser.password : formData.get('password')),

            email: currentUser.email,

            rank: (formData.get('rank') === null ? currentUser.rank :
                formData.get('rank').toString().length === 0 ? currentUser.rank : formData.get('rank')),

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
                navigate("/");
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
                                    <TextField sx={{ input: { color: themeMode.secondary } }} name="firstName" label={'First Name'} id="EditFormfirstName" color={themeMode.secondary} margin="normal" defaultValue={currentUser.firstName} focused />
                                    <TextField sx={{ input: { color: themeMode.secondary } }} name="lastName" label={'Last Name'} id="EditFormlastName" color={themeMode.secondary} margin="normal" defaultValue={currentUser.lastName} focused />
                                    <TextField sx={{ input: { color: themeMode.secondary } }} name="userName" label={'Username'} id="EditFormUsername" color={themeMode.secondary} margin="normal" defaultValue={currentUser.userName} focused />
                                    <TextField sx={{ input: { color: themeMode.secondary } }} name="password" label={'Password'} id="EditFormPassword" color={themeMode.secondary} margin="normal" type="password" defaultValue={currentUser.password} focused />
                                    <TextField sx={{ input: { color: themeMode.secondary } }} name="confirmpassword" label={'Confirm Password'} id="EditFormConfirmPassword" color={themeMode.secondary} margin="normal" type="password" defaultValue={currentUser.password} focused />
                                    <TextField sx={{ input: { color: themeMode.secondary } }} name="rank" label={'Rank'} id="EditFormRank" color={themeMode.secondary} margin="normal" defaultValue={currentUser.rank} focused />
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