import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
// import Register from './pages/Register';
// import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import PrivateAdminRoute from './components/PrivateAdminRoute';
import ChangePassword from './pages/ChangePassword';
import AdminRegisterUser from './pages/AdminRegisterUser';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/* <Route path="/register" element={<Register />} /> */}
      <Route path="/dashboard" element={<Dashboard />} />
      {/* <Route path="/admin/login" element={<AdminLogin />} /> */}
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/admin/register-user" element={<AdminRegisterUser />} />

      <Route path="/admin/dashboard" element={<PrivateAdminRoute><AdminDashboard /> </PrivateAdminRoute>} />
    </Routes>
  );
};

export default App;
