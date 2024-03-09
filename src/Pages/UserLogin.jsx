import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Checkbox, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material';

const UserLogin = ({ onLogin, errorMessage }) => {
  const [loginData, setLoginData] = useState({
    userIdEmail: '',
    password: '',
    keepSignedIn: false,
  });

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: name === 'keepSignedIn' ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(loginData);
  };

  
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Card sx={{ maxWidth: 500, width: '100%' }}>
        <CardContent>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Typography variant="h5" gutterBottom align="center">
              Login
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="userIdEmail"
                  label="User ID (Email)"
                  name="userIdEmail"
                  autoComplete="username"
                  value={loginData.userIdEmail}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={loginData.password}
                  onChange={handleChange}
                />

              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={loginData.keepSignedIn}
                      onChange={handleChange}
                      name="keepSignedIn"
                      color="primary"
                    />
                  }
                  label="Keep me signed in"
                />
              </Grid>
              <Grid item xs={6} display="flex" justifyContent="flex-end">
                <Link href="#" variant="body2">
                  Forgot Password?
                </Link>
              </Grid>
              <Grid item xs={12}>
                {errorMessage && (
                  <Typography color="error" variant="body2">
                    {errorMessage}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserLogin;
