import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Check if user is logged in on mount
  useEffect(() => {
    if (token) {
      verifyUser();
    }
  }, [token]);

  const verifyUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data.user);
      setError(null);
    } catch (err) {
      setToken(null);
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email, password, name) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, {
        email,
        password,
        name,
      });
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Signup failed. Please try again.";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const signin = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(`${API_BASE_URL}/api/auth/signin`, {
        email,
        password,
      });
      const { token: newToken, user: userData } = response.data;
      setToken(newToken);
      setUser(userData);
      localStorage.setItem("token", newToken);
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Sign in failed. Please try again.";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    setError(null);
  };

  const verifyCertificate = async (certificateName, certificateDetails) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/certificates`,
        { certificateName, certificateDetails },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Refresh user data to get updated certificates
      await verifyUser();
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Certificate verification failed.";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        signup,
        signin,
        logout,
        verifyCertificate,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
