import  React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link } from 'react-router-dom';






export default function TopNav() {
  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static">
        <Toolbar>
          <Link to='https://youtube.com/@ReachMalayalam?si=WPs_Yf-j2thMGZet' style={{textDecoration:'none', color:'inherit'}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            
          >
            <YouTubeIcon/>
      
          </IconButton>
         
          
          <Typography
            variant="body1"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'inline' } }}
          >
            Subscribe Now!
          </Typography>
          </Link>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}
