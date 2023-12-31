import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { Link } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import DefaultTheme from './DefaultTheme';
import DarkTheme from './DarkTheme';
import { useThemeContext } from './ThemeContext';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { useAuth0 } from "@auth0/auth0-react";
import { useUserContext } from './UserContext';
import ReservationsMenu from './ReservationsDropDown';
import RoomsMenu from './RoomsDropDown';
import UsersMenu from './UsersDropDown';

const pages = [
    // <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>Home</Link>,
    // <Link to="/:userId/reservations/:roomId" style={{ textDecoration: "none", color: "inherit" }}>Reservations</Link>,
    // <Link to="/:userId/rooms" style={{ textDecoration: "none", color: "inherit" }}>Rooms</Link>,
    // <Link to="/:userId/admin" style={{ textDecoration: "none", color: "inherit" }}>Users</Link>,
    <Link to="/credits/" style={{ textDecoration: "none", color: "inherit" }}>Credits</Link>
];

function ResponsiveAppBar() {
    const [auth, setAuth] = React.useState(true);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const { themeMode, setThemeMode } = useThemeContext();

    // Brought-in Auth0 context
    const { isAuthenticated } = useAuth0();

    // Brought-in user context
    const { currentUser } = useUserContext();

    const handleThemeChange = (event) => {
        setAuth(event.target.checked);
        if (themeMode === 'light') {
            setThemeMode('dark');
        } else if (themeMode === 'dark') {
            setThemeMode('light');
        }
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <ThemeProvider theme={themeMode === "dark" ? DarkTheme : DefaultTheme}>
            <AppBar position="static" color={themeMode === "light" ? "primary" : "secondary"} enableColorOnDark>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <RocketLaunchIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Link to='/' style={{ textDecoration: "none", color: "inherit" }}>
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontWeight: 400,
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                SpaceTime
                            </Typography>
                        </Link>
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <RocketLaunchIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Link to='/' style={{ textDecoration: "none", color: "inherit" }}>
                            <Typography
                                variant="h5"
                                noWrap
                                component="a"
                                href="/"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'flex', md: 'none' },
                                    flexGrow: 1,
                                    fontFamily: 'monospace',
                                    fontWeight: 400,
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                SpaceTime Collaborators
                            </Typography>
                        </Link>
                        <ReservationsMenu />
                        <RoomsMenu />
                        {isAuthenticated && currentUser.isAdmin ? <UsersMenu /> : null}
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 400,
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            {isAuthenticated ? `Welcome ${currentUser.userName}!` : ""}
                        </Typography>
                        <span style={{ paddingRight: '15px' }}>
                            {isAuthenticated ? currentUser.isAdmin ? "Administrator" : "User" : "Guest"}
                        </span>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={auth}
                                        onChange={handleThemeChange}
                                        aria-label="theme switch"
                                    />
                                }
                                label={auth ? 'Dark' : 'Light'}
                            />
                        </FormGroup>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt={isAuthenticated ? currentUser.userName : ""} src="/assets/images/avatar.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                { isAuthenticated ? 
                                <MenuItem>
                                <Link to={`/${currentUser.id}/Account`} style={{ textDecoration: "none", color: "inherit" }}>
                                    <Button sx={{ textDecoration: "none", color: "inherit" }} onClick={() => handleCloseUserMenu()}>My Account</Button>
                                </Link>
                                </MenuItem> : null }
                                <MenuItem>
                                {isAuthenticated ? <LogoutButton /> : <LoginButton />}
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
}
export default ResponsiveAppBar;
