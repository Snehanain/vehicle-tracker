import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Box } from '@mui/material';

const Header = ({ mode, setMode }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value) => {
    if (value) {
      setMode(value);
    }
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2 !important' }} elevation={4}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        
        {/* Left empty box for spacing or future logo */}
        <Box sx={{ width: '150px' }} />

        {/* Center title */}
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, textAlign: 'center', color: '#fff' }}
        >
          Vehicle Monitoring System
        </Typography>

        {/* Right side buttons */}
        <Box>
          <Button sx={{ color: '#fff' }}>Settings</Button>
          <Button sx={{ color: '#fff' }}>Help</Button>
          <Button sx={{ color: '#fff' }} onClick={handleClick}>Mode</Button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleClose()}>
            <MenuItem onClick={() => handleClose('light')}>Light</MenuItem>
            <MenuItem onClick={() => handleClose('dark')}>Dark</MenuItem>
          </Menu>
        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default Header;
