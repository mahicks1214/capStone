import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button,  useTheme } from '@mui/material';

const Navbar = () => {
    const theme = useTheme();

    const linkStyle = {
        marginRight: theme.spacing(2),
        color: 'inherit',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                    TimeSpace Connections
                </Typography>

                <Button color="inherit" component={RouterLink} to="/" style={linkStyle}>
                    Home
                </Button>
                <Button color="inherit" component={RouterLink} to="/login" style={linkStyle}>
                    Log In
                </Button>
                <Button color="inherit" component={RouterLink} to="/createaccount" style={linkStyle}>
                    Create an Account
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;