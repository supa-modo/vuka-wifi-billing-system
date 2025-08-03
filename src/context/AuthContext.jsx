import { createContext, useState, useEffect } from "react";
import apiService from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const stored = localStorage.getItem("adminUser");
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(
    () => localStorage.getItem("authToken") || ""
  );

  useEffect(() => {
    if (admin && token) {
      localStorage.setItem("adminUser", JSON.stringify(admin));
      localStorage.setItem("authToken", token);
      apiService.setAuthToken(token);
    } else {
      localStorage.removeItem("adminUser");
      localStorage.removeItem("authToken");
      if (!token) {
        apiService.setAuthToken(null);
      }
    }
  }, [admin, token]);

  const login = (jwt, adminInfo) => {
    setToken(jwt);
    setAdmin(adminInfo);
    apiService.setAuthToken(jwt);
  };

  const logout = () => {
    setToken("");
    setAdmin(null);
    localStorage.removeItem("adminUser");
    localStorage.removeItem("authToken");
    apiService.setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ admin, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
