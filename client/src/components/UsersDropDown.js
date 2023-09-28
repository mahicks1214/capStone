import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { Link } from 'react-router-dom';
import { useUserContext } from './UserContext';

export default function UsersMenu() {
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { currentUser } = useUserContext();
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
        Users
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
        <MenuItem component={Link} to={`/${currentUser.id}/Users`} onClick={handleClose}>View Users</MenuItem>
        <MenuItem component={Link} to={`/${currentUser.id}/Users/Create`} onClick={handleClose}>Add User</MenuItem>
        { /* These are handled within "/users" as an administrator*/ }
        {/* <MenuItem href="/users/:userid/edit" onClick={handleClose}>Edit User</MenuItem> */}
        {/* <MenuItem href="/users/:userid/delete" onClick={handleClose}>Delete User</MenuItem> */}
      </Menu>
    </div>
  );
}