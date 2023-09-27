import React, { useEffect, useState } from 'react';
import {
    Container,
    Button,
    Box,
    Typography,
    Paper,
    Grid,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Divider,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const [spaces, setSpaces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8080/spaces')
            .then((response) => response.json())
            .then((data) => {
                setSpaces(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setIsLoading(false);
            });
    }, []);

    const handleAddSpace = () => {
        console.log('Adding a space...');
        alert('You pressed "Add a Space"');
         navigate("/:userId/addspace");
    };

    const handleToManageReservations = () => {
        
        alert('You pressed "Manage Reservations"');
         navigate("/:userId/ManageReservations");
    };

    const handleRemoveSpace = (id) => {
        // Send a DELETE request to remove the space
        fetch(`http://localhost:8080/spaces/${id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }                
                setSpaces((prevSpaces) => prevSpaces.filter((space) => space.id !== id));
            })
            .catch((error) => {
                console.error('There was a problem with the DELETE operation:', error);
            });
    };

    const handleEditSpace = (id) => {        
        console.log(`Editing space with ID: ${id}`);
        navigate(`/:userId/editspace/:id`);
    };

    return (
        <Container maxWidth="md" style={{ marginTop: '40px' }}>
            <Box mt={12} sx={{ textAlign: 'center' }}>
                <Grid container justifyContent="center">
                    <Grid item xs={12} sm={6}>
                        <Typography gutterBottom variant="h5" component="div">
                                    Manage Spaces
                        </Typography>
                        <Button
                            fullWidth
                            onClick={handleAddSpace}
                            variant="contained"
                            color="primary"
                            sx={{ ml: 1, boxShadow: '2px 2px 5px rgba(0,0,0,0.3)', mt: 2 }}
                        >
                            Add a Space
                        </Button>
                        <Button
                            fullWidth
                            onClick={handleToManageReservations}
                            variant="contained"
                            color="primary"
                            sx={{ ml: 1, boxShadow: '2px 2px 5px rgba(0,0,0,0.3)', mt: 2 }}
                        >
                            Manage Reservation
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            <Paper elevation={5} style={{ padding: '20px' }}>
                {isLoading ? (
                    <Grid container justifyContent="center" alignItems="center" style={{ height: '200px' }}>
                        <CircularProgress color="primary" />
                    </Grid>
                ) : (
                    <List>
                        {spaces.map((space, index) => (
                            <React.Fragment key={space.id}>
                                <ListItem>
                                    <ListItemText
                                        primaryTypographyProps={{ variant: 'h6', color: 'textPrimary' }}
                                        primary={`Room Name: ${space.roomName} Room Number: ${space.roomNumber}`}
                                        secondary={`Building Name: ${space.buildingName} Building Number: ${space.buildingNumber}`}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" color="primary" onClick={() => handleEditSpace(space.id)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton edge="end" color="error" onClick={() => handleRemoveSpace(space.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                {index !== spaces.length - 1 && <Divider />}
                            </React.Fragment>
                        ))}
                    </List>
                )}
            </Paper>
        </Container>
    );
};

export default Admin;
