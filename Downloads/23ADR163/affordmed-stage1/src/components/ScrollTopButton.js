import React from 'react';
import { Zoom, useScrollTrigger, Box, Fab } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// ScrollTopButton shows a floating button when the user scrolls down
export default function ScrollTopButton() {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 200 });

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 24, right: 24 }}
      >
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
    </Zoom>
  );
}
