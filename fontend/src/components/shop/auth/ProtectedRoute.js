import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticate, isAdmin } from "./fetchApi";

const ProtectedRoute = () => {
  const isAuthenticated = isAuthenticate();
  const isUserAdmin = isAdmin();

  if (!isAuthenticated || isUserAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;