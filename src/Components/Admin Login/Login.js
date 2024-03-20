import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { Button, Box, TextField, Typography, Container, Snackbar, Alert as MuiAlert } from '@mui/material';
import { useAuth } from '../../Context/AuthContext'; // Ensure this path matches your project structure

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isResettingPassword) {
      try {
        await sendPasswordResetEmail(auth, email);
        setSnackbarMessage('Password reset email sent. Check your inbox.');
        setSnackbarSeverity('success');
      } catch (error) {
        setSnackbarMessage(error.message);
        setSnackbarSeverity('error');
      }
      setOpenSnackbar(true);
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/Admin');
      } catch (error) {
        setSnackbarMessage(error.message);
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    }
  };

  const handleForgotPassword = () => {
    setIsResettingPassword(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleSignOut = async () => {
    await auth.signOut();
    setEmail('');
    setPassword('');
    navigate('/');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {currentUser ? (
          <>
            <Typography component="h1" variant="h5">
              Welcome {currentUser.email}
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={() => navigate('/Admin')}>
                Admin Dashboard
              </Button>
              <Button variant="contained" sx={{ mt: 3, mb: 2, ml: 2 }} onClick={() => navigate('/ReportNews')}>
                Report News
              </Button>
              <Button variant="contained" sx={{ mt: 3, mb: 2, ml: 2 }} onClick={() => navigate('/NewsManager')}>
                News Manager
              </Button>
              <Button variant="contained" color="error" sx={{ mt: 3, mb: 2, ml: 2 }} onClick={handleSignOut}>
                Sign Out
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Typography component="h1" variant="h5">
              {isResettingPassword ? 'Reset Password' : 'Sign in'}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {!isResettingPassword && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {isResettingPassword ? 'Reset Password' : 'Sign In'}
              </Button>
              {!isResettingPassword && (
                <Button
                  onClick={handleForgotPassword}
                  sx={{ cursor: 'pointer', textTransform: 'none' }}
                >
                  Forgot password?
                </Button>
              )}
            </Box>
          </>
        )}
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <MuiAlert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default Login;
