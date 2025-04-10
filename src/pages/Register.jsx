import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
} from '@mui/material';
import Logo from '../assets/JMD.png';

const Register = () => {
  const [passportNumber, setPassportNumber] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${BASE_URL}/api/auth/register`, {
        passportNumber,
        password,
        name,
      });

      alert('User registered! You can now login.');
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url("https://wallpapercave.com/wp/wp7883696.jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={10} sx={{ p: 4, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.95)' }}>
          <Box display="flex" justifyContent="center" mb={2}>
            <img
              src={Logo}
              alt="JMD Logo"
              style={{ width: 200, height: 'auto' }}
            />
          </Box>
          <Typography variant="h5" align="center" gutterBottom>
            Register for Visa Updates
          </Typography>
          <form onSubmit={handleRegister}>
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              label="Passport Number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={passportNumber}
              onChange={(e) => setPassportNumber(e.target.value)}
              required
               pattern="[A-Z0-9]{8,10}"
  title="Passport number must be 8-10 uppercase letters or numbers"
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
            >
              Register
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
