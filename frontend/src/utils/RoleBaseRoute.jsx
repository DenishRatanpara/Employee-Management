import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";

const RoleBaseRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!requiredRole.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return user ? children : <Navigate to="/" replace />;
};

export default RoleBaseRoute;
