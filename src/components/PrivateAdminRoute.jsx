// src/components/PrivateAdminRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateAdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  // Check if token exists and user is admin
  if (!token || !user || !user.isAdmin) {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default PrivateAdminRoute;
