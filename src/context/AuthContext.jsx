import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const stored = localStorage.getItem("adminUser");
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(
    () => localStorage.getItem("adminToken") || ""
  );

  useEffect(() => {
    if (admin && token) {
      localStorage.setItem("adminUser", JSON.stringify(admin));
      localStorage.setItem("adminToken", token);
    } else {
      localStorage.removeItem("adminUser");
      localStorage.removeItem("adminToken");
    }
  }, [admin, token]);

  const login = (jwt, adminInfo) => {
    setToken(jwt);
    setAdmin(adminInfo);
  };

  const logout = () => {
    setToken("");
    setAdmin(null);
    localStorage.removeItem("adminUser");
    localStorage.removeItem("adminToken");
  };

  return (
    <AuthContext.Provider value={{ admin, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
