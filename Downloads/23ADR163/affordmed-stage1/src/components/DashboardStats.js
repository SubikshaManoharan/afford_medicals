import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';

// Simple stat card used in the dashboard summary
function StatCard({ title, value, color }) {
  return (
    <Paper className="stat-card" elevation={2} sx={{ p: 2 }}>
      <Typography variant="subtitle2" color="textSecondary">
        {title}
      </Typography>
      <Box sx={{ mt: 1 }}>
        <Typography variant="h5" sx={{ color, fontWeight: 700 }}>{value}</Typography>
      </Box>
    </Paper>
  );
}

// DashboardStats shows totals for types
export default function DashboardStats({ total, eventCount, resultCount, placementCount }) {
  return (
    <Grid container spacing={2} sx={{ my: 2 }}>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard title="Total Notifications" value={total} color="#1976d2" />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard title="Events" value={eventCount} color="#1976d2" />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard title="Results" value={resultCount} color="#2e7d32" />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard title="Placements" value={placementCount} color="#ef6c00" />
      </Grid>
    </Grid>
  );
}
