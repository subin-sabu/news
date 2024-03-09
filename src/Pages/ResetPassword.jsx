import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const ResetPassword = ({ onReset, serverError }) => {
  const [email, setEmail] = useState('');

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onReset(email); // Assuming you have a function to handle the reset logic
  };
  

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Card sx={{ maxWidth: 500, width: '100%' }}>
        <CardContent>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              We will send a password reset link to your registered email id.
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Enter your registered email id"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={handleChange}
                />
                {serverError && (
                  <Typography color="error" variant="body2">
                    {serverError} {/* Displaying server-side error */}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={6}>
                <Link to="/Login" variant="body2" style={{ textDecoration: 'none' }}>
                  <Button variant="outlined" color="primary">
                    Cancel
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={6} display="flex" justifyContent="flex-end">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ResetPassword;
