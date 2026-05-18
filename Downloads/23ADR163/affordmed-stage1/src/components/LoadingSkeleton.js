import React from 'react';
import { Grid, Skeleton } from '@mui/material';

// Show skeletons while data is loading to improve perceived performance
export default function LoadingSkeleton({ count = 6 }) {
  const items = Array.from({ length: count });
  return (
    <Grid container spacing={2}>
      {items.map((_, i) => (
        <Grid item xs={12} sm={6} md={4} key={i}>
          <Skeleton variant="rectangular" height={140} animation="wave" />
        </Grid>
      ))}
    </Grid>
  );
}
