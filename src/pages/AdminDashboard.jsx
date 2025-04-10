import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Select, MenuItem, FormControl, Button, Typography, Box,
  TextField, Dialog, DialogActions, DialogContent, DialogTitle
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newPassword, setNewPassword] = useState('');

  const token = localStorage.getItem('token');
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/auth/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      await axios.put(
        `${BASE_URL}/api/auth/update-status/${userId}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchUsers(); // Refresh data
    } catch (err) {
      console.error('Status update failed:', err);
    }
  };

  const handleClearDatabase = async () => {
    const confirmed = window.confirm("Are you sure you want to delete all non-admin users?");
    if (!confirmed) return;
  
    try {
      await axios.delete(`${BASE_URL}/api/admin/clear-users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
      alert('Database cleared successfully!');
    } catch (err) {
      console.error('Error clearing database:', err);
      alert('Failed to clear database');
    }
  };
  

  const handleFileUpload = async (userId, file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append('visa', file);

    try {
      await axios.post(
        `${BASE_URL}/api/auth/upload-visa/${userId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchUsers();
    } catch (err) {
      console.error('File upload failed:', err);
    }
  };

  const handleOpenDialog = (userId) => {
    setSelectedUserId(userId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUserId(null);
    setNewPassword('');
  };

  const handleChangePassword = async () => {
    try {
      await axios.put(
        `${BASE_URL}/api/auth/admin-change-password/${selectedUserId}`,
        { newPassword },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      handleCloseDialog();
      alert('Password updated successfully!');
    } catch (err) {
      console.error('Failed to update password:', err);
      alert('Failed to update password');
    }
  };
  const handleDeleteUser = async (userId) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;
  
    try {
      await axios.delete(`${BASE_URL}/api/auth/admin/delete-user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
      alert('User deleted successfully!');
    } catch (err) {
      console.error('Failed to delete user:', err);
      alert('Failed to delete user');
    }
  };
  

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.passportNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>

      <TextField
        label="Search by name or passport number"
        variant="outlined"
        fullWidth
        sx={{ mb: 3 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
<Button
  variant="contained"
  color="error"
  sx={{ mb: 2 }}
  onClick={handleClearDatabase}
>
  Clear All Non-Admin Users
</Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
              <TableCell sx={{ color: '#fff' }}>Name</TableCell>
              <TableCell sx={{ color: '#fff' }}>Passport Number</TableCell>
              <TableCell sx={{ color: '#fff' }}>Status</TableCell>
              <TableCell sx={{ color: '#fff' }}>Visa Upload</TableCell>
              <TableCell sx={{ color: '#fff' }}>Visa Download</TableCell>
              <TableCell sx={{ color: '#fff' }}>Change Password</TableCell>
              <TableCell sx={{ color: '#fff' }}>Delete</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.passportNumber}</TableCell>
                <TableCell>
                  <FormControl fullWidth size="small">
                    <Select
                      value={user.status || 'Pending'}
                      onChange={(e) =>
                        handleStatusChange(user._id, e.target.value)
                      }
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Approved">Approved</MenuItem>
                      <MenuItem value="Rejected">Rejected</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload
                    <input
                      type="file"
                      accept="application/pdf"
                      hidden
                      onChange={(e) =>
                        handleFileUpload(user._id, e.target.files[0])
                      }
                    />
                  </Button>
                </TableCell>
                <TableCell>
                  {user.visaURL ? (
                    <a
                      href={`http://localhost:5000/${user.visaURL}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="contained" startIcon={<PictureAsPdfIcon />}>
                        View Visa
                      </Button>
                    </a>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      Not Uploaded
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => handleOpenDialog(user._id)}>
                    Change Password
                  </Button>
                </TableCell>
                <TableCell>
  <Button
    variant="outlined"
    color="error"
    onClick={() => handleDeleteUser(user._id)}
  >
    Delete
  </Button>
</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Password Change Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Change User Password</DialogTitle>
        <DialogContent>
          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleChangePassword}>Update</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDashboard;
