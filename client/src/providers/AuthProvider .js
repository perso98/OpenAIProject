import React, { useState, useEffect, createContext } from "react";
import { getAuth, loginToAccount, logoutFromAccount } from "../utils/api";
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    getAuth(setUser);
  }, []);

  const login = async (login, password) => {
    loginToAccount(setUser, login, password);
  };
  const logout = async () => {
    logoutFromAccount(setUser);
  };
  const value = { user, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export default AuthProvider;
