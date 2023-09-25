import React, { useEffect, useState } from 'react';
import {
    Container, Grid, Card, CardActions, CardContent,
    Button, Typography, TextField, Box
} from '@mui/material';
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';
import { FormControlLabel, Switch } from '@mui/material';

const EditSpace = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [space, setSpace] = useState({
        roomName: '',
        roomNumber: '',
        buildingName: '',
        buildingNumber: '',
        equipment: '',
        seating: '',
        classification: '',
        network: '',
        isTrainer: false,
    });

    useEffect(() => {
        fetch(`http://localhost:8080/spaces/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setSpace(data);
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, [id]);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        fetch(`http://localhost:8080/spaces/update/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(space),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                alert(`Space with ID ${id} updated successfully!`);
                navigate(`/spaces/${id}`);
            })
            .catch((error) => {
                console.error('There was a problem with the PATCH operation:', error);
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
                                    Edit Space
                                </Typography>
                                <form onSubmit={handleFormSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                id="roomName"
                                                label="Room Name"
                                                variant="outlined"
                                                value={space.roomName}
                                                onChange={(e) => setSpace({ ...space, roomName: e.target.value })}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                id="roomNumber"
                                                label="Room Number"
                                                variant="outlined"
                                                value={space.roomNumber}
                                                onChange={(e) => setSpace({ ...space, roomNumber: e.target.value })}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                id="buildingName"
                                                label="Building Name"
                                                variant="outlined"
                                                value={space.buildingName}
                                                onChange={(e) => setSpace({ ...space, buildingName: e.target.value })}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                id="buildingNumber"
                                                label="Building Number"
                                                variant="outlined"
                                                value={space.buildingNumber}
                                                onChange={(e) => setSpace({ ...space, buildingNumber: e.target.value })}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                id="equipment"
                                                label="Equipment"
                                                variant="outlined"
                                                value={space.equipment}
                                                onChange={(e) => setSpace({ ...space, equipment: e.target.value })}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                id="seating"
                                                label="Seating"
                                                variant="outlined"
                                                value={space.seating}
                                                onChange={(e) => setSpace({ ...space, seating: e.target.value })}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                id="classification"
                                                label="Classification"
                                                variant="outlined"
                                                value={space.classification}
                                                onChange={(e) => setSpace({ ...space, classification: e.target.value })}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                id="network"
                                                label="Network"
                                                variant="outlined"
                                                value={space.network}
                                                onChange={(e) => setSpace({ ...space, network: e.target.value })}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControlLabel
                                                label="Is Trainer"
                                                control={
                                                    <Switch
                                                        checked={space.isTrainer}
                                                        onChange={(e) => setSpace({ ...space, isTrainer: e.target.checked })}
                                                        name="isTrainer"
                                                        color="primary"
                                                    />

                                                }

                                            />
                                        </Grid>
                                    </Grid>
                                </form>
                            </CardContent>
                            <CardActions>
                                <Button
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    sx={{ ml: 1, boxShadow: '2px 2px 5px rgba(0,0,0,0.3)', mt: 2 }}
                                >
                                    Save Changes
                                </Button>
                            </CardActions>
                        </Card>

                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default EditSpace;
