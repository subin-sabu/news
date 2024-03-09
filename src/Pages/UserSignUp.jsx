import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Autocomplete, Typography, Grid, Fade, Checkbox, FormControlLabel, Link, Card, CardContent, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const UserSignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    acceptTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const allowedDomains = [
    "gmail.com", "yahoo.com", "yahoo.in", "outlook.com", "live.com", "rediffmail.com", "icloud.com"
  ];

  useEffect(() => {
    const emailParts = formData.email.split('@');
    const isValidEmailDomain = emailParts.length === 2 && allowedDomains.includes(emailParts[1]);
    const isValidForm = formData.firstName.match(/^[a-zA-Z.]+$/) &&
                        formData.lastName.match(/^[a-zA-Z.]+$/) &&
                        isValidEmailDomain &&
                        formData.password.length >= 8 &&
                        /[A-Z]/.test(formData.password) && // Checks for an uppercase letter
                        /[a-z]/.test(formData.password) && // Checks for a lowercase letter
                        /\d/.test(formData.password) && // Checks for a digit
                        formData.acceptTerms;
    setIsFormValid(isValidForm);
  }, [formData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));

    if (name === 'email') {
      setEmailError('');
    }
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      password: value,
    }));

    // Reset password error state on change
    setPasswordError('');
  };

  const handleAcceptTermsChange = (event) => {
    setFormData({ ...formData, acceptTerms: event.target.checked });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    // Add submission logic here
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    if (name === 'email') {
      const emailParts = formData.email.split('@');
      if (emailParts.length !== 2 || !allowedDomains.includes(emailParts[1])) {
        setEmailError('Enter a valid email address');
      }
    } else if (name === 'password') {
      // Validate password criteria on blur
      if (formData.password.length < 8 || !/[A-Z]/.test(formData.password) || !/[a-z]/.test(formData.password) || !/\d/.test(formData.password)) {
        setPasswordError('Password must be at least 8 characters, include an uppercase letter, a lowercase letter, and a number.');
      }
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validateName = (name) => /^[a-zA-Z.]*$/.test(name);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Card sx={{ maxWidth: 500, width: '100%' }}>
        <CardContent>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Fade in timeout={500}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h5" gutterBottom align="center">
                    Sign Up
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    autoComplete="fname"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={!validateName(formData.firstName) && formData.firstName !== ''}
                    helperText={!validateName(formData.firstName) && formData.firstName !== '' ? 'Invalid first name' : ''}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={!validateName(formData.lastName) && formData.lastName !== ''}
                    helperText={!validateName(formData.lastName) && formData.lastName !== '' ? 'Invalid last name' : ''}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!emailError}
                    helperText={emailError}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handlePasswordChange}
                    onBlur={handleBlur}
                    error={!!passwordError}
                    helperText={passwordError}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox checked={formData.acceptTerms} onChange={handleAcceptTermsChange} name="acceptTerms" color="primary" />}
                    label={<React.Fragment>I accept the <Link href="#" underline="hover">Terms and Conditions</Link>.</React.Fragment>}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color={isFormValid ?'primary':'secondary' }
                    disabled={!isFormValid}
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
                  </Button>
                  {!formData.acceptTerms &&
                    <Typography color="error" variant="body2">
                      You must accept the terms and conditions to sign up.
                    </Typography>
                  }
                </Grid>
              </Grid>
            </Fade>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserSignUp;
