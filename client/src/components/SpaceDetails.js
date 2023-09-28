import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink, useParams } from 'react-router-dom';


function fetchReservations(setSpaces) {
    fetch('http://localhost:8080/spaces/:id')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            setSpaces(data.slice(0, 6));
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

const defaultTheme = createTheme();


export default function LandingPage() {
    const [spaces, setSpaces] = useState([]);
    const { id, spaceName } = useParams();
    useEffect(() => {
        fetchReservations(setSpaces);
    }, []);

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <main>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Available Spaces
                        </Typography>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                        </Stack>
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    <Grid container spacing={4}>
                        {spaces.map((spaces) => (
                            <Grid item key={spaces.id} xs={12} sm={6} md={4}>
                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                    <CardMedia
                                        component="div"
                                        sx={{
                                            // 16:9
                                            pt: '56.25%',
                                        }}
                                        image="https://source.unsplash.com/random?wallpapers"
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Space - {spaces.spaceName}
                                        </Typography>
                                        <Typography gutterBottom variant="h5" component="h3">
                                            Building - {spaces.buildingName}, Room {spaces.spaceNumber}
                                        </Typography>
                                        <Typography>
                                            Classification - {spaces.classification}, Network - {spaces.netWork}
                                        </Typography>
                                        <Typography>
                                            Seating - {spaces.seating}, Trainer - {spaces.isTrainer ? "Yes" : "No"}
                                        </Typography>
                                        <Typography>
                                            Equipment - {spaces.equipment}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Stack direction="column" spacing={1}>
                                            <Button size="small">Book this Room!</Button>
                                            <Button size="small">Edit</Button>
                                        </Stack>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </ThemeProvider>
    );
}
