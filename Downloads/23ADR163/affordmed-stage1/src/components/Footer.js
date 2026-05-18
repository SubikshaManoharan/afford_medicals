import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box component="footer" sx={{ mt: 6, py: 3, textAlign: 'center', color: 'text.secondary' }}>
      <Typography variant="body2">AffordMed Campus Hiring — Stage 1 Demo</Typography>
      <Typography variant="caption">Built with React and Material UI</Typography>
    </Box>
  );
}
