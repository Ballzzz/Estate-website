import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticate, isAdmin } from "./fetchApi";

const AdminProtectedRoute = () => {
  if (!isAuthenticate() || !isAdmin()) {
    return <Navigate to="/user/profile" replace />;
  }
  return <Outlet />;
};

export default AdminProtectedRoute;