import React, { useState } from 'react';
import {
    Container, Grid, Card, CardActions, CardContent,
    Button, Typography, TextField, Box
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const AddSpace = () => {
    const [roomName, setRoomName] = useState('');
    const [roomNumber, setRoomNumber] = useState('');
    const [buildingName, setBuildingName] = useState('');
    const [buildingNumber, setBuildingNumber] = useState('');
    const [equipment, setEquipment] = useState('');
    const [seating, setSeating] = useState('');
    const [classification, setClassification] = useState('');
    const [network, setNetwork] = useState('');
    const [isTrainer, setIsTrainer] = useState(false);

    const handleSubmit = () => {
        const data = {
            roomName,
            roomNumber,
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
            alert(`${roomName} space added successfully!`);
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
                                            id="roomName"
                                            label="Room Name"
                                            variant="outlined"
                                            value={roomName}
                                            onChange={(e) => setRoomName(e.target.value)}
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

export default AddSpace;
