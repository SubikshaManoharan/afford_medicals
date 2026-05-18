import React from 'react';
import { Box, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

// Simple search bar to filter notifications by message/title
export default function SearchBar({ value, onChange }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
      <TextField
        size="small"
        placeholder="Search notifications..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{ width: '100%', maxWidth: 640 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          endAdornment: (
            value ? (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => onChange('')}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ) : null
          ),
        }}
      />
    </Box>
  );
}
