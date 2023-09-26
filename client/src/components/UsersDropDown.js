import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

export default function UsersMenu() {
  
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
        {/* <Link to="/users"> */}
        <MenuItem onClick={handleClose}>View Users</MenuItem>
        {/* </Link> */}
        {/* <Link to="/users/add"> */}
        <MenuItem onClick={handleClose}>Add User</MenuItem>
        {/* </Link> */}
        { /* These are handled within "/users" as an administrator*/ }
        <MenuItem href="/users/:userid/edit" onClick={handleClose}>Edit User</MenuItem>
        <MenuItem href="/users/:userid/delete" onClick={handleClose}>Delete User</MenuItem>
      </Menu>
    </div>
  );
}