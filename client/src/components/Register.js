import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import "../App.css";
import { registerAccount } from "../utils/api";

function Register() {
  const [loginForm, setLoginForm] = useState({
    login: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = (user) => {
    registerAccount(user.login, user.password);
  };
  return (
    <div className="login-container">
      <div className="login-elements">
        <h1 style={{ textAlign: "center" }}>Register</h1>
        <TextField
          label="Login"
          onChange={(e) =>
            setLoginForm({ ...loginForm, login: e.target.value })
          }
        />
        <TextField
          label="Password"
          type="password"
          onChange={(e) =>
            setLoginForm({ ...loginForm, password: e.target.value })
          }
        />
        <TextField
          label="Confirm password"
          type="password"
          onChange={(e) =>
            setLoginForm({ ...loginForm, confirmPassword: e.target.value })
          }
        />
        {loginForm.login && loginForm.password && loginForm.confirmPassword ? (
          <Button
            variant="contained"
            color="success"
            onClick={() => handleSubmit(loginForm)}
          >
            {" "}
            Register
          </Button>
        ) : (
          <Button variant="contained" color="success" disabled={true}>
            Register
          </Button>
        )}
      </div>
    </div>
  );
}

export default Register;
