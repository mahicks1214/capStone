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

export default function CreateSpace() {
    const navigate = useNavigate();
    const [isTrainer, setIsTrainer] = useState(false);
    const label = { inputProps: { 'aria-label': 'Trainer?' } };
    const handleChange = (event) => {
        setIsTrainer(event.target.checked);
    };

    const { themeMode } = useThemeContext();

    const handleSubmit = (event) => {
        event.preventDefault();
        var formData = new FormData(event.currentTarget)

        let editSpace = {
            spaceName: (formData.get('spaceName') === null ? "" :
                formData.get('spaceName').toString().length === 0 ? "" : formData.get('spaceName')),

            spaceNumber: (formData.get('spaceNumber') === null ? "" :
                formData.get('spaceNumber').toString().length === 0 ? "" : formData.get('spaceNumber')),

            buildingName: (formData.get('buildingName') === null ? "" :
                formData.get('buildingName').toString().length === 0 ? "" : formData.get('buildingName')),

            buildingNumber: (formData.get('buildingNumber') === null ? "" :
                formData.get('buildingNumber').toString().length === 0 ? "" : formData.get('buildingNumber')),

            equipment: (formData.get('equipment') === null ? "" :
                formData.get('equipment').toString().length === 0 ? "" : formData.get('equipment')),

            seating: (formData.get('seating') === null ? "" :
                formData.get('seating').toString().length === 0 ? "" : formData.get('seating')),

            classification: (formData.get('classification') === null ? "" :
                formData.get('classification').toString().length === 0 ? "" : formData.get('classification')),
            
            network: (formData.get('network') === null ? "" :
                formData.get('network').toString().length === 0 ? "" : formData.get('network')),

            isTrainer: isTrainer

        };
        fetch(`http://localhost:8080/spaces/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editSpace)
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
                navigate("/Spaces");
            })
            .catch((error) => {
                navigate("/Spaces");
            });

    };

    return (
        <ThemeProvider theme={themeMode === "dark" ? DarkTheme : DefaultTheme}>
            <CssBaseline />
            <AppBar position="sticky" color={themeMode === "dark" ? "primary" : "secondary"}>
                <Typography sx="" variant="h6" color="inherit" align="left" noWrap>
                    Create Space
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
                                            <h2>Create new space</h2>
                                        </center>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            '& .MuiTextField-root': { width: '25ch' },
                                        }}>
                                        <TextField sx={{ input: { color: themeMode.secondary } }} name="spaceName" label={'Space Name'} id="EditFormspaceName" color={themeMode === "dark" ? "primary" : "secondary"} margin="normal" size="small" focused />
                                        <TextField sx={{ input: { color: themeMode.secondary } }} name="spaceNumber" label={'Space Number'} id="EditFormspaceNumber" color={themeMode === "dark" ? "primary" : "secondary"} margin="normal" size="small" focused />
                                        <TextField sx={{ input: { color: themeMode.secondary } }} name="buildingName" label={'Building Name'} id="EditFormBuildingName" color={themeMode === "dark" ? "primary" : "secondary"} margin="normal" size="small" focused />
                                        <TextField sx={{ input: { color: themeMode.secondary } }} name="buildingNumber" label={'Building Number'} id="EditFormBuildingNumber" color={themeMode === "dark" ? "primary" : "secondary"} margin="normal" size="small" focused />
                                        <TextField sx={{ input: { color: themeMode.secondary } }} name="equipment" label={'Equipment'} id="EditFormEquipment" color={themeMode === "dark" ? "primary" : "secondary"} margin="normal" size="small" focused />
                                        <TextField sx={{ input: { color: themeMode.secondary } }} name="seating" label={'Seating'} id="EditSeating" color={themeMode === "dark" ? "primary" : "secondary"} margin="normal" size="small" focused />
                                        <TextField sx={{ input: { color: themeMode.secondary } }} name="classification" label={'Classification'} id="EditFormClassification" color={themeMode === "dark" ? "primary" : "secondary"} margin="normal" size="small" focused />
                                        <TextField sx={{ input: { color: themeMode.secondary } }} name="network" label={'Network'} id="EditFormNetwork" color={themeMode === "dark" ? "primary" : "secondary"} margin="normal" size="small" focused />

                                        <span>Trainer?</span>
                                        <Switch {...label} checked={isTrainer} onChange={handleChange} color={themeMode === "dark" ? "primary" : "secondary"} />
                                        <Box
                                            sx={{
                                                padding: '5px'
                                            }}>
                                            <Button
                                                variant="contained"
                                                margin="normal"
                                                type="submit"
                                                color={themeMode === "dark" ? "primary" : "secondary"}
                                            >Create Space</Button>
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