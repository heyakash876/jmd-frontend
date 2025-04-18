import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Snackbar,
  Alert,
  Grid,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const AdminRegisterUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    fatherName: '',
    passportNumber: '',
    password: '',
    visaCountry: '',
    age: '',
    phoneNumber: '',
    status: '',
    visaFile: null,
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      visaFile: e.target.files[0],
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      lastName: '',
      fatherName: '',
      passportNumber: '',
      password: '',
      visaCountry: '',
      age: '',
      phoneNumber: '',
      status: '',
      visaFile: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const form = new FormData();

      for (let key in formData) {
        if (key !== 'visaFile') form.append(key, formData[key]);
      }

      if (formData.visaFile) form.append('visa', formData.visaFile);

      await axios.post(`${BASE_URL}/api/auth/admin/register-user`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setSnackbarOpen(true);
      resetForm();
    } catch (error) {
      console.error('Registration error:', error.response?.data || error);
      alert(error.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, px: 2 }}>
      <Typography variant="h5" gutterBottom textAlign="center">
        Register New User
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField label="Name" name="name" fullWidth margin="normal" value={formData.name} onChange={handleChange} />
        <TextField label="Last Name" name="lastName" fullWidth margin="normal" value={formData.lastName} onChange={handleChange} />
        <TextField label="Father's Name" name="fatherName" fullWidth margin="normal" value={formData.fatherName} onChange={handleChange} />
        <TextField label="Passport Number" name="passportNumber" fullWidth margin="normal" value={formData.passportNumber} onChange={handleChange} />
        <TextField label="Password" name="password" type="password" fullWidth margin="normal" value={formData.password} onChange={handleChange} />
        <TextField label="Visa Country" name="visaCountry" fullWidth margin="normal" value={formData.visaCountry} onChange={handleChange} />
        <TextField label="Age" name="age" fullWidth margin="normal" value={formData.age} onChange={handleChange} />
        <TextField label="Phone Number" name="phoneNumber" fullWidth margin="normal" value={formData.phoneNumber} onChange={handleChange} />

        <TextField
          select
          label="Visa Status"
          name="status"
          value={formData.status}
          fullWidth
          margin="normal"
          onChange={handleChange}
          sx={{ minWidth: '150px' }}
        >
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Approved">Approved</MenuItem>
          <MenuItem value="Rejected">Rejected</MenuItem>
        </TextField>

        <Box sx={{ mt: 2 }}>
          <Button variant="contained" component="label" fullWidth>
            Upload Visa
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          {formData.visaFile && (
            <Typography variant="body2" mt={1}>
              File selected: {formData.visaFile.name}
            </Typography>
          )}
        </Box>

        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid item xs={6}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Register User
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => navigate('/admin/dashboard')} // Adjust route
            >
              Back to Dashboard
            </Button>
          </Grid>
        </Grid>
      </form>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: '100%' }}
          action={
            <Button color="inherit" size="small" onClick={resetForm}>
              Register Another
            </Button>
          }
        >
          User registered successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminRegisterUser;
