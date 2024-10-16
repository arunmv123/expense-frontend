import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setAuth(decoded);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      const decoded = jwtDecode(res.data.token);
      setAuth(decoded);
      return true; // for successful login
    } catch (error) {
      console.error("Login error:", error);
      return false; // for unsuccessful login
    }
  };

  const register = async (username, email, password) => {
    try {
      await axios.post("/api/auth/register", { username, email, password });
      return true; // for successful registration
    } catch (error) {
      console.error("Registration error:", error);
      return false; // for unsuccessful registration
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
