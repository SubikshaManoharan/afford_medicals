import React from 'react';
import { Box, Chip } from '@mui/material';

// FilterBar uses chips for quick filtering and better UX
export default function FilterBar({ filter, onFilterChange }) {
  const options = ['All', 'Event', 'Result', 'Placement'];

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap', mb: 2 }}>
      {options.map((o) => (
        <Chip
          key={o}
          label={o}
          clickable
          color={filter === o ? 'primary' : 'default'}
          onClick={() => onFilterChange(o)}
        />
      ))}
    </Box>
  );
}

