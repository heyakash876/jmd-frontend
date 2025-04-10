import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Link,
} from '@mui/material';
import Logo from '../assets/JMD.png'; // Make sure logo is travel-related

const Login = () => {
  const [passportNumber, setPassportNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, {
        passportNumber,
        password,
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url("https://wallpapercave.com/wp/wp7883696.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Roboto, sans-serif',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: 420,
          borderRadius: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        }}
      >
        <Box display="flex" justifyContent="center" mb={2}>
          <img
            src={Logo}
            alt="JMD Logo"
            style={{
              width: 90,
              height: 90,
              borderRadius: '50%',
              objectFit: 'cover',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            }}
          />
        </Box>

        <Typography
          variant="h5"
          align="center"
          fontWeight={600}
          gutterBottom
          sx={{ color: '#0d47a1' }}
        >
          ✈️ Immigration Portal Login
        </Typography>

        <Typography variant="body2" align="center" mb={3} color="text.secondary">
          Your gateway to international opportunities
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Passport Number"
            variant="outlined"
            value={passportNumber}
            onChange={(e) => setPassportNumber(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
          />

          {error && (
            <Typography color="error" mt={1}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              borderRadius: 2,
              background: 'linear-gradient(to right, #ff8f00, #f9a825)',
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(to right, #f9a825, #fbc02d)',
              },
            }}
          >
            Log In
          </Button>

          <Box mt={3} textAlign="center">
            <Typography variant="body2">
              Don’t have an account?{' '}
              <Link href="/register" underline="hover">
                Register here
              </Link>
            </Typography>
            <Typography variant="body2" mt={1}>
              <Link href="/admin/login" underline="hover">
                Login as Admin
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
