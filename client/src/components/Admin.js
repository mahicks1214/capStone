import React from 'react';
import { Container, Grid, Card, CardActions,Button, Typography, Box, CardContent} from '@mui/material';
import { Link as RouterLink, useNavigate} from 'react-router-dom';

const Admin = () => {
    const nav = useNavigate();
    const handleAddSpace = () => {
        console.log('Adding a space...');
        alert('You pressed "Add a Space"');
        nav('/addspace');
    };

    const handleRemoveSpace = () => {
        console.log('Removing a space...');
        alert('You pressed "Remove a Space"');
        nav('/removespace');
    };

    const handleUpdateSpace = () => {
        console.log('Updating a space...');
        alert('You pressed "Update a Space"');
        nav('/updatespace');
    };

    return (
        <Container>
            <Box mt={12}>
                <Grid container justifyContent="center">
                    <Grid item xs={12} sm={6}>
                        <Card sx={{ mb: 3 }}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Manage Spaces
                                </Typography>
                            </CardContent>
                            <CardActions>
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
                                    onClick={handleRemoveSpace}
                                    variant="contained"
                                    color="secondary"
                                    sx={{ ml: 1, boxShadow: '2px 2px 5px rgba(0,0,0,0.3)', mt: 2 }}
                                >
                                    Remove a Space
                                </Button>
                                <Button
                                    fullWidth
                                    onClick={handleUpdateSpace}
                                    variant="outlined"
                                    color="primary"
                                    sx={{ ml: 1, boxShadow: '2px 2px 5px rgba(0,0,0,0.3)', mt: 2 }}
                                >
                                    Update a Space
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Admin;
