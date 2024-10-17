import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);

  // If user is not authenticated, redirect to login
  if (!auth) {
    return <Navigate to="/login" />;
  }

  // Otherwise, render the requested component (children)
  return children;
};

export default ProtectedRoute;
