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
import PostAddIcon from '@mui/icons-material/PostAdd';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { Link } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import DefaultTheme from './DefaultTheme';
import { useThemeContext } from './Context';
import LoginButton from './LoginButton';

const pages = [
    <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>Items</Link>,
    <Link to="/NewItem" style={{ textDecoration: "none", color: "inherit" }}>Add Item</Link>,
    <Link to="/Login" style={{ textDecoration: "none", color: "inherit"}}>Login</Link>,
    <Link to="/NewUser" style={{ textDecoration: "none", color: "inherit" }}>Sign Up</Link>
];

const settings = ['My Items', 'Account Settings', 'Logout'];

function ResponsiveAppBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { themeMode, setThemeMode } = useThemeContext();
  
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
    <ThemeProvider theme={DefaultTheme}>
        <AppBar position="static" color="primary" enableColorOnDark>
        <Container maxWidth="xl">
            <Toolbar disableGutters>
            <PostAddIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
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
                    I3 Solutions
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
            <PostAddIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
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
                    I3 Solutions
                </Typography>
            </Link>
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
                    <Avatar alt="Administrator" src="/assets/images/avatar.jpg" />
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
                <LoginButton />
                {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                ))}
                </Menu>
            </Box>
            </Toolbar>
        </Container>
        </AppBar>
    </ThemeProvider>
  );
}
export default ResponsiveAppBar;
