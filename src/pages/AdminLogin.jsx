import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Alert,
} from '@mui/material';
import Logo from '../assets/JMD.png';

const AdminLogin = () => {
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

      if (!res.data.user.isAdmin) {
        setError('Access denied. You are not an admin.');
        return;
      }

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #fff3e0, #e3f2fd)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={6} sx={{ p: 4, borderRadius: 4 }}>
          {/* Logo + Heading */}
          <Box textAlign="center" mb={3}>
            <img
              src={Logo}
              alt="JMD Logo"
              style={{ width: 100, marginBottom: 10 }}
            />
            <Typography variant="h5" fontWeight="bold">
              Admin Login
            </Typography>
          </Box>

          <form onSubmit={handleLogin}>
            <TextField
              label="Passport Number"
              fullWidth
              margin="normal"
              value={passportNumber}
              onChange={(e) => setPassportNumber(e.target.value)}
              required
            />
            <TextField
              label="Password"
              fullWidth
              margin="normal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminLogin;
