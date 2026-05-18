import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Badge, Switch, FormControlLabel } from '@mui/material';
import logo from '../logo.svg.png';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ThemeToggle from './ThemeToggle';

// Header component with app title, notification count, current time and theme toggle
export default function Header({ total, mode, onToggleTheme, useMock, onToggleMock }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 60 * 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #eee' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* App logo (uses public/affordmed-logo.svg) */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box component="img" src={logo} alt="AffordMed" sx={{ width: 160, height: 'auto' }} />
          </Box>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Smart Campus
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {time.toLocaleString()}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FormControlLabel
            control={<Switch checked={!!useMock} onChange={onToggleMock} color="primary" />}
            label={useMock ? 'Mock' : 'Live'}
          />

          <IconButton aria-label="notifications">
            <Badge badgeContent={total} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <ThemeToggle mode={mode} onToggle={onToggleTheme} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
