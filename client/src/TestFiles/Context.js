import React from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from "@mui/material/Grid"
import { Button, Box } from "@mui/material";
import TextField from '@mui/material/TextField';
import { themes } from '../App';
import { useUserContext } from '../App';
import { useThemeContext } from '../App';

//  function DefaultPage() {
    
//     return (
//         <ThemeContextProvider>
//             <UserContextProvider>
//                 {/* <Navbar /> */}
//                 <LoginScreen />
//             </UserContextProvider>
//         </ThemeContextProvider>
//     );
// }


export default function LoginScreen() {
    const {currentUser, setCurrentUser} = useUserContext();
    const {theme, toggleTheme} = useThemeContext();
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        var formData = new FormData(event.currentTarget)
    
        setCurrentUser(
            {
                firstname: formData.get("firstName"),
                lastname: formData.get("lastName")
            }
        )
            navigate("/content");
    }
    return (        
                        <div style={{backgroundColor: themes[theme].background}}>
                            <h1>Welcome {`${currentUser.firstname} ${currentUser.lastname}`}!</h1>
                            <button onClick={() => {toggleTheme()}}>Switch to {theme === 'light' ? 'dark' : 'light'} mode</button>
                            <Box
                                component="form"
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    '& .MuiTextField-root': { width: '25ch' },
                                    // color: colorPalette.secondary,
                                }}
                                onSubmit={handleSubmit}
                            >
                                <Grid container spacing={1}>
                                    <Grid item xs={3}>
                                        <Box
                                            sx={{
                                                height: 50
                                            }}>
                                            <center>
                                                <h2>Login</h2>
                                            </center>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                '& .MuiTextField-root': { width: '25ch' },
                                            }}>
                                            <TextField name="firstName" label={'First Name'} id="FirstNameForm" color="success" margin="normal" focused />
                                            <TextField name="lastName" label={'Last Name'} id="LastNameForm" color="success" margin="normal" focused />
                                            <Box
                                                sx={{
                                                    padding: '25px'
                                                }}>
                                                <Button
                                                    variant="contained"
                                                    margin="normal"
                                                    type="submit"
                                                    color="success"
                                                >Login</Button>
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </div>
    );
}