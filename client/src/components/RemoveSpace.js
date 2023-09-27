import React, { useEffect, useState } from 'react';
import {
    Container, Grid, Card, CardActions, CardContent,
    Button, Typography, Box
} from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';

const RemoveSpace = () => {
    const { id } = useParams(); 
    const [space, setSpace] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/spaces/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
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

    const handleRemove = () => {
        fetch(`http://localhost:8080/spaces/delete/${id}`, {
            method: 'DELETE',
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            alert(`Space with ID ${id} removed successfully!`);
        })
        .catch((error) => {
            console.error('There was a problem with the DELETE operation:', error);
        });
    };

    return (
        <Container>
            <Box mt={12}>
                <Grid container justifyContent="center">
                    <Grid item xs={12} sm={6}>
                        {space ? (
                            <Card sx={{ mb: 3 }}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Remove Space
                                    </Typography>

                                    <Typography variant="body1">
                                        Room Name: {space.spaceName}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        fullWidth
                                        onClick={handleRemove}
                                        variant="contained"
                                        color="primary"
                                        component={RouterLink}
                                        to={`/spaces`}
                                        sx={{ ml: 1, boxShadow: '2px 2px 5px rgba(0,0,0,0.3)', mt: 2 }}
                                    >
                                        Remove Space
                                    </Button>
                                </CardActions>
                            </Card>
                        ) : (
                            <Typography variant="body1">
                                Loading space ...
                            </Typography>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default RemoveSpace;
