import React, { useState } from 'react';
import {
    Container, Grid, Card, CardActions, CardContent,
    Button, Typography, TextField, Box
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

const CreateSpace = () => {
    const [spaceName, setSpaceName] = useState('');
    const [spaceNumber, setSpaceNumber] = useState('');
    const [buildingName, setBuildingName] = useState('');
    const [buildingNumber, setBuildingNumber] = useState('');
    const [equipment, setEquipment] = useState('');
    const [seating, setSeating] = useState('');
    const [classification, setClassification] = useState('');
    const [network, setNetwork] = useState('');
    const [isTrainer, setIsTrainer] = useState(false);

    const handleSubmit = () => {
        const data = {
            spaceName,
            spaceNumber,
            buildingName,
            buildingNumber,
            equipment,
            seating,
            classification,
            network,
            isTrainer
        };

        fetch('http://localhost:8080/spaces/create', {
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
                alert(`${spaceName} space added successfully!`);
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
                                    Add a New Space
                                </Typography>

                                <Grid container spacing={2}>

                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            id="spaceName"
                                            label="Space Name"
                                            variant="outlined"
                                            value={spaceName}
                                            onChange={(e) => setSpaceName(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            id="spaceNumber"
                                            label="Space Number"
                                            variant="outlined"
                                            value={spaceNumber}
                                            onChange={(e) => setSpaceNumber(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            id="buildingName"
                                            label="Building Name"
                                            variant="outlined"
                                            value={buildingName}
                                            onChange={(e) => setBuildingName(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            id="buildingNumber"
                                            label="Building Number"
                                            variant="outlined"
                                            value={buildingNumber}
                                            onChange={(e) => setBuildingNumber(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            id="equipment"
                                            label="Equipment"
                                            variant="outlined"
                                            value={equipment}
                                            onChange={(e) => setEquipment(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            id="seating"
                                            label="Seating"
                                            variant="outlined"
                                            value={seating}
                                            onChange={(e) => setSeating(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            id="classification"
                                            label="Classification"
                                            variant="outlined"
                                            value={classification}
                                            onChange={(e) => setClassification(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            id="network"
                                            label="Network"
                                            variant="outlined"
                                            value={network}
                                            onChange={(e) => setNetwork(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={isTrainer}
                                                    onChange={(e) => setIsTrainer(e.target.checked)}
                                                    name="isTrainer"
                                                    color="primary"
                                                />
                                            }
                                            label="Is Trainer"
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
                                    to={`/spaces`}
                                    sx={{ ml: 1, boxShadow: '2px 2px 5px rgba(0,0,0,0.3)', mt: 2 }}
                                >
                                    Add Space
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default CreateSpace;
