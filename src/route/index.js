import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

const AppRouter = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decode the JWT token
        const expirationTime = decodedToken.exp * 1000; // Get the expiration time (in milliseconds)

        if (new Date().getTime() > expirationTime) {
          handleLogout(); // Logout if the token has expired
        } else {
          const remainingTime = expirationTime - new Date().getTime();
          setTimeout(handleLogout, remainingTime); // Schedule a logout when the token expires
          setIsAuthenticated(true); // Mark the user as authenticated
        }
      } catch (error) {
        console.error("Invalid token:", error);
        handleLogout(); // If there's an error decoding the token, log the user out
      }
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <PublicRoute element={<Login />} isAuthenticated={isAuthenticated} />
      ),
    },
    {
      path: "/SignUp",
      element: (
        <PublicRoute element={<SignUp />} isAuthenticated={isAuthenticated} />
      ),
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute
          element={<Dashboard />}
          isAuthenticated={isAuthenticated}
        />
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
