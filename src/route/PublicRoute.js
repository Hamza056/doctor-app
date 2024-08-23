import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({
  element,
  isAuthenticated,
  redirectPath = "/dashboard",
}) => {
  return isAuthenticated ? <Navigate to={redirectPath} /> : element;
};

export default PublicRoute;
