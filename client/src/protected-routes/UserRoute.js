import { Outlet, Navigate } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider ";

function UserRoute() {
  const { user } = useContext(AuthContext);
  return user ? <Navigate to="/" replace /> : <Outlet />;
}

export default UserRoute;
