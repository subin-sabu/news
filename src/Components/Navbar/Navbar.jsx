import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';
import reach from '../Assets/reach.jpg';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

// Mock functions and data
const isAuthenticated = () => false;
const getUserProfile = () => ({ name: "John Doe", profilePic: "" });

const pages = [{ english: 'home', malayalam: 'ഹോം' },
{ english: 'kerala', malayalam: 'കേരളം' },
{ english: 'national', malayalam: 'രാജ്യം' },
{ english: 'world', malayalam: 'ലോകം' },
{ english: 'cinema', malayalam: 'സിനിമ' },
{ english: 'sports', malayalam: 'കായികം' },
{ english: 'lifestyle', malayalam: 'ലൈഫ് സ്റ്റൈൽ' },
{ english: 'business', malayalam: 'ബിസിനസ്സ്' },
{ english: 'astrology', malayalam: 'ജ്യോതിഷം' },
{ english: 'auto', malayalam: 'വാഹനം' },
{ english: 'analysis', malayalam: 'വിശകലനം' },
{ english: 'crime', malayalam: 'ക്രൈം' }];
const settings = isAuthenticated() ? ['Profile', 'Account', 'Dashboard', 'Logout'] : ['Login'];

function Navbar() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mobileSettingsOpen, setMobileSettingsOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSettingsToggle = () => {
    setMobileSettingsOpen(!mobileSettingsOpen);
  };

  const user = getUserProfile();

  const drawerPages = (
    <Box onClick={handleDrawerToggle} sx={{ width: 250 }}>
      <Typography variant="h6" sx={{ my: 2, textAlign: 'center' }}>
        Pages
      </Typography>
      <List>
        {pages.map((page) => (
          <ListItem key={page.english} disablePadding>
            <ListItemButton onClick={() => navigate(`/${page.english}`)}>
              <ListItemText primary={page.malayalam} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const drawerSettings = (
    <Box onClick={handleSettingsToggle} sx={{ width: 250 }}>
      <Typography variant="h6" sx={{ my: 2, textAlign: 'center' }}>
        Settings
      </Typography>
      <List>
        {settings.map((setting) => (
          <ListItem key={setting} disablePadding>
            <ListItemButton onClick={() => navigate(`/${setting}`)}>
              <ListItemText primary={setting} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar sx={{ bgcolor: '#181818' }} position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          {/* Logo/Image Box */}
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-start' }}>
            <Link to="/">
              <img src={reach} alt="Logo" style={{ maxHeight: '50px' }} />
            </Link>
          </Box>
          {/* Navigation Links for Larger Screens */}
          <Box sx={{
            flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-start', overflowX: 'auto', whiteSpace: 'nowrap', 
            WebkitOverflowScrolling: 'touch',
            '-ms-overflow-style': 'none',
            scrollbarWidth: 'none',
          }}>
            {pages.map((page, index) => (
              <Button
                key={page.english}
                onClick={() => navigate(`/${page.english}`)}
                sx={{
                  my: 2, color: 'white', display: 'inline-block', flexShrink:'0',
                  // Preserve original spacing between nav items
                  marginLeft: index !== 0 ? '5px' : null,
                }}
              >
                {page.malayalam}
              </Button>
            ))}
          </Box>
          {/* User Account Icon/Avatar */}
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleSettingsToggle} sx={{ p: 0, mr: 2, display: { md: 'none' } }}>
                <Avatar><AccountCircleIcon /></Avatar>
              </IconButton>
            </Tooltip>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {settings.map((setting) => (
                <Button key={setting} onClick={() => navigate(`/${setting}`)} sx={{ color: 'white' }}>
                  {setting}
                </Button>
              ))}
            </Box>
          </Box>
        </Toolbar>
      </Container>
      {/* Mobile Drawer for Pages */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        {drawerPages}
      </Drawer>
      {/* Mobile Drawer for Settings */}
      <Drawer
        anchor="right"
        open={mobileSettingsOpen}
        onClose={handleSettingsToggle}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        {drawerSettings}
      </Drawer>
    </AppBar>
  );
}

export default Navbar;
