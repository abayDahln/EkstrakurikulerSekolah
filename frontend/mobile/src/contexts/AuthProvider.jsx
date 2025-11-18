import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import dummyData from "../data/dummy.json";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    }
    return null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("user");
        setIsAuthenticated(false);
      }
    }
  }, [user]);

  const login = (email, password) => {
    const foundUser = dummyData.users.find(u => u.email === email);
    if (foundUser && password === "password") {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};