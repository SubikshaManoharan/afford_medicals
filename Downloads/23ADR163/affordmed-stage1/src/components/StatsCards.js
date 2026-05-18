import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';

function Stat({ title, value, color }) {
  return (
    <Paper sx={{ p: 2, borderRadius: 2 }} elevation={2}>
      <Typography variant="subtitle2" color="textSecondary">{title}</Typography>
      <Box sx={{ mt: 1 }}>
        <Typography variant="h5" sx={{ color, fontWeight: 700 }}>{value}</Typography>
      </Box>
    </Paper>
  );
}

export default function StatsCards({ total, events, results, placements }) {
  return (
    <Grid container spacing={2} sx={{ my: 2 }}>
      <Grid item xs={12} sm={6} md={3}><Stat title="Total Notifications" value={total} color="#1976d2" /></Grid>
      <Grid item xs={12} sm={6} md={3}><Stat title="Events" value={events} color="#1976d2" /></Grid>
      <Grid item xs={12} sm={6} md={3}><Stat title="Results" value={results} color="#2e7d32" /></Grid>
      <Grid item xs={12} sm={6} md={3}><Stat title="Placements" value={placements} color="#ef6c00" /></Grid>
    </Grid>
  );
}
