import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

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
                {/* <Link to="/rooms"> */}
                    <MenuItem onClick={handleClose}>View Rooms</MenuItem>
                {/* </Link> */}
                {isAuthenticated && currentUser.isAdmin ?
                    // <Link to="/rooms/add">
                        <MenuItem onClick={handleClose}>Add Room</MenuItem>
                    // </Link>
                    : null}
                { /* These are handled within "/rooms" as administrator*/ }
                {isAuthenticated && currentUser.isAdmin ? <MenuItem href="/rooms/:spaceid/edit" onClick={handleClose}>Edit Room</MenuItem> : null}
                {isAuthenticated && currentUser.isAdmin ? <MenuItem href="/rooms/:spaceid/delete" onClick={handleClose}>Delete Room</MenuItem> : null}
            </Menu>
        </div>
    );
}