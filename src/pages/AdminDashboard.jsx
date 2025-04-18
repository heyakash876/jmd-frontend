import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  TextField,
  Typography,
  Grid,
  Card,
  CardContent,
  Snackbar
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import LockResetIcon from '@mui/icons-material/LockReset';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useNavigate } from 'react-router-dom';
// import * as XLSX from 'xlsx';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';


const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [openAdminPasswordDialog, setOpenAdminPasswordDialog] = useState(false);
  const [adminNewPassword, setAdminNewPassword] = useState('');
  const token = localStorage.getItem('token');
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/auth/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleStatusChange = async (userId, newStatus) => {
    try {
      setLoading(true);
      await axios.put(`${BASE_URL}/api/auth/update-status/${userId}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) {
      console.error('Status update failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirm = window.confirm('Delete this user?');
    if (!confirm) return;
    try {
      setLoading(true);
      await axios.delete(`${BASE_URL}/api/auth/admin/delete-user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) {
      console.error('Delete failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (userId, file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append('visa', file);
    try {
      setLoading(true);
      await axios.post(`${BASE_URL}/api/auth/upload-visa/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      fetchUsers();
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (userId) => {
    setSelectedUserId(userId);
    setOpenDialog(true);
  };

  const handleChangePassword = async () => {
    try {
      setLoading(true);
      await axios.put(`${BASE_URL}/api/auth/admin-change-password/${selectedUserId}`, {
        newPassword,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Password changed');
      setOpenDialog(false);
      setNewPassword('');
    } catch (err) {
      alert('Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminPasswordChange = async () => {
    try {
      await axios.put(`${BASE_URL}/api/auth/change-admin-password`, {
        newPassword: adminNewPassword
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Admin password changed');
      setOpenAdminPasswordDialog(false);
      setAdminNewPassword('');
    } catch (err) {
      alert('Failed to change admin password');
    }
  };

  const handleRegisterNewUser = () => {
    navigate('/admin/register-user');
  };

  // const handleExportExcel = () => {
  //   const worksheet = XLSX.utils.json_to_sheet(users);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
  //   XLSX.writeFile(workbook, "Users.xlsx");
  // };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Name', 'Passport Number', 'Status', 'Country']],
      body: users.map(user => [
        `${user.name} ${user.lastName}`,
        user.passportNumber,
        user.status,
        user.visaCountry
      ])
    });
    doc.save("Users.pdf");
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
    

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.passportNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: users.length,
    approved: users.filter(u => u.status === 'Approved').length,
    pending: users.filter(u => u.status === 'Pending').length,
    rejected: users.filter(u => u.status === 'Rejected').length
  };

  return (
    <Box sx={{ p: 4 }}>
     

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
  <Typography variant="h4" fontWeight={600} color="primary.main">
    Admin Dashboard
  </Typography>
  <Button variant="outlined" color="secondary" onClick={handleLogout}>
    Logout
  </Button>
</Box>


      <Grid container spacing={2} mb={3}>
        <Grid item xs={6} md={3}><Card><CardContent><Typography variant="h6">Total</Typography><Typography>{stats.total}</Typography></CardContent></Card></Grid>
        <Grid item xs={6} md={3}><Card><CardContent><Typography variant="h6">Approved</Typography><Typography>{stats.approved}</Typography></CardContent></Card></Grid>
        <Grid item xs={6} md={3}><Card><CardContent><Typography variant="h6">Pending</Typography><Typography>{stats.pending}</Typography></CardContent></Card></Grid>
        <Grid item xs={6} md={3}><Card><CardContent><Typography variant="h6">Rejected</Typography><Typography>{stats.rejected}</Typography></CardContent></Card></Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          label="Search by name or passport number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Button variant="outlined" onClick={() => setOpenAdminPasswordDialog(true)}>Change Admin Password</Button>
          {/* <Button variant="contained" sx={{ ml: 2 }} onClick={handleExportExcel}>Export Excel</Button> */}
          {/* <Button variant="contained" sx={{ ml: 2 }} onClick={handleExportPDF}>Export PDF</Button> */}
        </Box>
        <Button variant="contained" color="error" onClick={async () => {
          if (window.confirm('Clear all non-admin users?')) {
            await axios.delete(`${BASE_URL}/api/admin/clear-users`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            fetchUsers();
          }
        }}>Clear All Users</Button>
      </Box>

      {loading ? <CircularProgress sx={{ display: 'block', mx: 'auto' }} /> : (
        filteredUsers.map(user => (
          <Accordion key={user._id} elevation={2} sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 600 }}>{user.name + " " + user.lastName} ({user.passportNumber})</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Status:</Typography>
              <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                <Select
                  value={user.status || 'Pending'}
                  onChange={(e) => handleStatusChange(user._id, e.target.value)}
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Approved">Approved</MenuItem>
                  <MenuItem value="Rejected">Rejected</MenuItem>
                </Select>
              </FormControl>
              <Typography sx={{ mt: 1 }}>Age: {user.age}</Typography>
              <Typography>Phone: {user.phoneNumber}</Typography>
              <Typography>Father's Name: {user.fatherName}</Typography>
              <Typography>Country: {user.visaCountry}</Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap' }}>
                <Button variant="outlined" startIcon={<CloudUploadIcon />} component="label">
                  Upload Visa
                  <input type="file" hidden accept="application/pdf" onChange={(e) => handleFileUpload(user._id, e.target.files[0])} />
                </Button>
                {user.visaURL ? (
                  <a href={`${BASE_URL}/${user.visaURL}`} target="_blank" rel="noopener noreferrer">
                    <Button variant="contained" startIcon={<PictureAsPdfIcon />}>View Visa</Button>
                  </a>
                ) : (
                  <Typography variant="body2" color="text.secondary">No Visa Uploaded</Typography>
                )}
              </Box>
              <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                <Button variant="outlined" startIcon={<LockResetIcon />} onClick={() => handleOpenDialog(user._id)}>
                  Change Password
                </Button>
                <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => handleDeleteUser(user._id)}>
                  Delete User
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))
      )}

      <Fab color="primary" sx={{ position: 'fixed', bottom: 20, right: 20 }} onClick={handleRegisterNewUser}>
        <AddIcon />
      </Fab>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Change User Password</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleChangePassword}>Update</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAdminPasswordDialog} onClose={() => setOpenAdminPasswordDialog(false)}>
        <DialogTitle>Change Admin Password</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="New Admin Password"
            type="password"
            value={adminNewPassword}
            onChange={(e) => setAdminNewPassword(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdminPasswordDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAdminPasswordChange}>Update</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDashboard;
