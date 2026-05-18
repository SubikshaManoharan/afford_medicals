import { createTheme } from '@mui/material/styles';

// Return a Material UI theme based on mode ('light'|'dark')
export function getTheme(mode = 'light') {
  return createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary: { main: '#1976d2' },
            background: { default: '#f6f9fc', paper: '#fff' },
          }
        : {
            primary: { main: '#90caf9' },
            background: { default: '#121212', paper: '#1e1e1e' },
          }),
    },
    typography: {
      fontFamily: ['Inter', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
    },
    components: {
      MuiAppBar: { defaultProps: { elevation: 0 } },
    },
  });
}
