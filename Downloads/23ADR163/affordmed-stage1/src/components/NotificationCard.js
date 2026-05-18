import React from 'react';
import { Card, CardContent, Typography, Chip, Box, IconButton } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';

// NotificationCard displays a single notification with type icon, priority and read state.
export default function NotificationCard({ notification, onToggleRead }) {
  const { title = 'No title', message = '', type = 'Event', date = '', priority = 'Low', read = false } = notification || {};

  const typeKey = String(type || 'event').toLowerCase();
  const icon = typeKey === 'event' ? <EventIcon /> : typeKey === 'result' ? <SchoolIcon /> : <WorkIcon />;

  // Priority color mapping
  const prioMap = { high: 'error', medium: 'warning', low: 'success' };
  const prioKey = String(priority || 'low').toLowerCase();
  const prioColor = prioMap[prioKey] || 'default';

  const preview = message && message.length > 160 ? message.slice(0, 157) + '...' : message;

  return (
    <Card className="notification-card modern-card" elevation={3} sx={{ backgroundColor: read ? 'inherit' : 'rgba(25,118,210,0.04)' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Box sx={{ color: 'primary.main' }}>{icon}</Box>
            <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Chip label={priority} color={prioColor} size="small" />
            <IconButton size="small" onClick={() => onToggleRead && onToggleRead(notification)}>
              {read ? <MarkEmailReadIcon /> : <MarkEmailUnreadIcon />}
            </IconButton>
          </Box>
        </Box>

        <Typography variant="body2" color="textSecondary" sx={{ mt: 1, mb: 2 }}>
          {preview}
        </Typography>

        <Typography variant="caption" color="textSecondary">
          {date ? new Date(date).toLocaleString() : 'No date provided'}
        </Typography>
      </CardContent>
    </Card>
  );
}

