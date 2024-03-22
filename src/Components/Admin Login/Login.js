import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { Button, Box, TextField, Typography, Container, Snackbar, Alert as MuiAlert } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/Admin');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const displaySnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isResettingPassword) {
      handleForgotPassword();
      return;
    }

    if (!email) {
      displaySnackbar('Please enter your email address.', 'error');
      return;
    }

    if (!password) {
      displaySnackbar('Please enter your password.', 'error');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/Admin');
    } catch (error) {
      displaySnackbar(error.message, 'error');
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      displaySnackbar('Please enter your email for password reset.', 'error');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      displaySnackbar('Password reset email sent. Check your inbox.', 'success');
    } catch (error) {
      displaySnackbar(error.message, 'error');
    }
  };

  const toggleResetPassword = () => {
    setIsResettingPassword(!isResettingPassword);
  };

  const handleCloseSnackbar = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
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
            {isResettingPassword ? 'Send Reset Email' : 'Sign In'}
          </Button>
          <Button
            onClick={toggleResetPassword}
            sx={{ textTransform: 'none' }}
          >
            {isResettingPassword ? 'Back to Sign In' : 'Forgot password?'}
          </Button>
        </Box>
      </Box>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <MuiAlert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default Login;
