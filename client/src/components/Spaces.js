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
import { ThemeProvider } from '@mui/material/styles';
import DefaultTheme from './DefaultTheme';
import DarkTheme from './DarkTheme';
import { useThemeContext } from './ThemeContext';
import { useUserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';


function fetchReservations(setSpaces, setDataReceived) {
    fetch('http://localhost:8080/Spaces')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            setSpaces(data);
            setDataReceived(true);
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

export default function LandingPage() {
    const [spaces, setSpaces] = useState([]);
    const { themeMode } = useThemeContext();
    const [dataReceived, setDataReceived] = useState(false);
    const { currentUser } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        fetchReservations(setSpaces, setDataReceived);
    }, [dataReceived]);

    return dataReceived ? (
        <ThemeProvider theme={themeMode === "dark" ? DarkTheme : DefaultTheme}>
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
                        {spaces.map((space) => (
                            <Grid item key={space.id} xs={12} sm={6} md={3}>
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
                                            Space - {space.spaceName}
                                        </Typography>
                                        <Typography gutterBottom variant="h5" component="h3">
                                            Building - {space.buildingName}, Room {space.spaceNumber}
                                        </Typography>
                                        <Typography>
                                            Classification - {space.classification}, Network - {space.netWork}
                                        </Typography>
                                        <Typography>
                                            Seating - {space.seating}, Trainer - {space.isTrainer ? "Yes" : "No"}
                                        </Typography>
                                        <Typography>
                                            Equipment - {space.equipment}
                                        </Typography>
                                    </CardContent>
                                    { !currentUser.guest ?
                                    <CardActions>
                                        <Stack direction="column" spacing={1}>
                                            <Button size="small" onClick={() => {navigate(`/${currentUser.id}/Reservations/${space.id}`)}}>Book this Room!</Button>
                                        </Stack>
                                    </CardActions>
                                    : null }
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </ThemeProvider>
    ) : <span>The space data was not retrieved.</span>;
}
