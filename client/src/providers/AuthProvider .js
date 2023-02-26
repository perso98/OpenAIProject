import React, { useState, useEffect, createContext } from "react";
import { getAuth, loginToAccount } from "../utils/api";
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    getAuth(setUser);
  }, []);

  const login = async (login, password) => {
    loginToAccount(setUser, login, password);
  };
  const value = { user, login };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export default AuthProvider;
