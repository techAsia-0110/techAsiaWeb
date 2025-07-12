import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const ProtectedRoute = ({ children }) => {
  const { userInfo } = useAuthStore();

  if (!userInfo) {
    // If user is not logged in, redirect them to the login page
    return <Navigate to="/" replace />;
  }

  // If user is logged in, render the component they are trying to access
  return children;
};

export default ProtectedRoute;