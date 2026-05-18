import React from 'react';
import { Box, Typography, Button } from '@mui/material';

// Friendly empty state UI when there are no notifications
export default function EmptyState({ onRefresh }) {
  return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>No notifications found</Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
        There are no notifications to display. Try changing filters or refresh.
      </Typography>
      <Button variant="contained" onClick={onRefresh}>Refresh</Button>
    </Box>
  );
}
