import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

import { useAuth0 } from "@auth0/auth0-react";
import { useUserContext } from './UserContext';

export default function ReservationsMenu() {
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
                Reservations
            </Button>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                {/* <Link to="/reservations"> */}
                    <MenuItem onClick={handleClose}>View Reservations</MenuItem>
                {/* </Link> */}
                {isAuthenticated ?
                    // <Link to={`/users/${currentUser.id}/reservations`}>
                        <MenuItem onClick={handleClose}>My Reservations</MenuItem>
                    // </Link>
                    : null}
                {isAuthenticated ?
                    // <Link to="/rooms">
                        <MenuItem onClick={handleClose}>Add Reservation</MenuItem>
                    // </Link>
                    : null}
                { /* These are handled within "/users/${currentUser.id}/reservations" as user or administrator*/ }
                {isAuthenticated ? <MenuItem href="/users/:userid/reservations/:id/edit" onClick={handleClose}>Edit Reservation</MenuItem> : null}
                {isAuthenticated ? <MenuItem href="/users/:userid/reservations/:id/delete"  onClick={handleClose}>Delete Reservation</MenuItem> : null}
            </Menu>
        </div>
    );
}