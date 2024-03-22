import React, { useState } from 'react';
import { Container, Typography, Paper, Button, Divider, AppBar, Toolbar, IconButton, Box, Dialog, DialogActions, DialogContent, DialogContentText, Slide, Snackbar, Alert } from '@mui/material';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config'; // Adjust this path to your Firebase config

// Transition component for Dialog
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AdminPage = () => {
  const navigate = useNavigate();
  const [openSignOutDialog, setOpenSignOutDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  });

  const handleOpenSignOutDialog = () => setOpenSignOutDialog(true);
  const handleCloseSignOutDialog = () => setOpenSignOutDialog(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSignOut = async () => {
    handleCloseSignOutDialog(); // Close the confirmation dialog
    try {
      await signOut(auth);
      navigate('/');
      // No need to set a success message here since we're navigating away
    } catch (error) {
      // Directly use error message from Firebase
      setSnackbar({ open: true, message: error.message, severity: 'error' });
    }
  };

  const Section = ({ title, buttonText, buttonLink }) => (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
        <Typography variant="h6">{title}</Typography>
        <Button variant="contained" onClick={() => navigate(buttonLink)}>
          {buttonText}
        </Button>
      </Box>
      <Divider />
    </>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default" elevation={0} sx={{ backgroundColor: 'lightgray' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Reach Malayalam Admin Panel
          </Typography>
          <IconButton color="inherit" onClick={handleOpenSignOutDialog}>
            <PowerSettingsNewIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Divider />
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ mt: 3, p: 3, borderRadius: '12px' }}>
          <Section title="News Manager" buttonText="Open" buttonLink="/NewsManager" />
          <Section title="Report News" buttonText="Open" buttonLink="/ReportNews" />
          <Box display="flex" justifyContent="center" my={2}>
            <Button variant="contained" onClick={() => navigate('/')}>
              Go to Home
            </Button>
          </Box>
        </Paper>
      </Container>

      <Dialog
        open={openSignOutDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseSignOutDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to sign out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSignOutDialog} color="success">Cancel</Button>
          <Button onClick={handleSignOut} color="error">Sign Out</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminPage;
