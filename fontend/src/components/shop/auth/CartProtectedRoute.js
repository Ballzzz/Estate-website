import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticate } from "./fetchApi";

const CartProtectedRoute = () => {
  const isAuthenticated = isAuthenticate();
  const cartHasItems = JSON.parse(localStorage.getItem("cart") || "[]").length !== 0;

  if (!isAuthenticated || !cartHasItems) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default CartProtectedRoute;