import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { Link } from 'react-router-dom';

import { useAuth0 } from "@auth0/auth0-react";
import { useUserContext } from './UserContext';

export default function RoomsMenu() {
    const { isAuthenticated } = useAuth0();
    const { currentUser } = useUserContext();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                color='inherit'
            >
                Rooms
            </Button>
            <Menu
                id="rooms-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                    <MenuItem component={Link} to="/Spaces" onClick={handleClose}>View Spaces</MenuItem>
                {isAuthenticated && currentUser.isAdmin ?
                        <MenuItem component={Link} to={`/${currentUser.id}/Spaces/Create`} onClick={handleClose}>Add Space</MenuItem>
                    : null}
            </Menu>
        </div>
    );
}