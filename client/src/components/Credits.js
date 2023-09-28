import { Button, Typography, Box } from "@mui/material";
import * as React from "react";
import Grid from '@mui/material/Grid';
import DefaultTheme from "./DefaultTheme";
import DarkTheme from "./DarkTheme";
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import { ThemeProvider } from '@emotion/react';
import { useThemeContext } from './ThemeContext';
import { useNavigate } from "react-router-dom";

export default function Credits() {
    const navigate = useNavigate();
    const { themeMode } = useThemeContext();
    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/`);
    }

    return (
        <ThemeProvider theme={themeMode === "dark" ? DarkTheme : DefaultTheme}>
            <CssBaseline />
            <AppBar position="sticky" color={themeMode === "dark" ? "primary" : "secondary"}>
                <Typography sx="" variant="h6" color="inherit" align="left" noWrap>
                    Credits
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
                                            <h1>Meet the Team Behind SpaceTime!</h1>
                                        </center>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            '& .MuiTextField-root': { width: '25ch' },
                                        }}>
                                        <h2>Michael Hickson</h2>
                                        <h2>Samuel Chadwick</h2>
                                        <h2>Laura Pulscher</h2>
                                        <h2>Allyn Sattler</h2>
                                        <Box
                                            sx={{
                                                paddingTop: "40px",
                                                paddingBottom: "40px"
                                            }}>
                                            <Button
                                                variant="contained"
                                                margin="normal"
                                                type="submit"
                                                color={themeMode === "dark" ? "primary" : "secondary"}
                                            >Great Job Team!</Button>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </center>
                </div>
            </Box>
        </ThemeProvider>
    )
}