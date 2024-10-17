import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check localStorage for existing token and decode it
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Check if the token has the correct format
      const tokenParts = token.split(".");
      if (tokenParts.length === 3) {
        const decodedToken = jwtDecode(token);
        // Check if the token is still valid
        if (decodedToken.exp * 1000 > Date.now()) {
          setAuth(decodedToken); // Set user data if the token is still valid
        } else {
          localStorage.removeItem("token");
        }
      } else {
        console.error("Invalid token format:", token);
        localStorage.removeItem("token");
      }
    }
    setLoading(false); // Loading state is false after checking for the token
  }, []);

  // Register function
  const register = async (userData) => {
    try {
      const response = await axios.post("/api/auth/register", userData);
      toast.success("Registration successful! Welcome!");
      return response.data;
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Registration failed.");
    }
  };

  // Login function
  const login = async (userData) => {
    try {
      const response = await axios.post("/api/auth/login", userData);

      const token = response.data.token;

      if (token) {
        localStorage.setItem("token", token);
        return token;
      } else {
        throw new Error("No token received");
      }
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setAuth(null); // Clear auth state
  };

  return (
    <AuthContext.Provider value={{ auth, register, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
