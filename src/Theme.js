
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  // Add your theme settings here

  
  palette: {
    primary: {
      main: '#5E35B1',
    },
    secondary: {
      main: '#F32148',
    },
    // Add more colors or customize the theme further
  },
  
  // Custome Breakpoints
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1800,
      xxl: 2500
    },
  },
});

export default theme;
