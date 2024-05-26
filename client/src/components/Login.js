import { Button, TextField } from "@mui/material";
import React, { useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider ";
import "../App.css";
function Login() {

  const { login } = useContext(AuthContext);   // Pobranie funkcji logowania z kontekstu autoryzacji
  const [loginForm, setLoginForm] = useState({ login: "", password: "" }); // Stan dla formularza logowania

  // Funkcja obsługująca wysyłanie formularza logowania
  const handleSubmit = (user) => {
    login(user.login, user.password);
  };
  return (
    <div className="login-container">
      <div className="login-elements">
        <h1 style={{ textAlign: "center" }}>Login</h1>
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
        {loginForm.login && loginForm.password ? (
          <Button
            variant="contained"
            color="success"
            onClick={() => handleSubmit(loginForm)}
          >
            {" "}
            Log in
          </Button>
        ) : (
          <Button variant="contained" color="success" disabled={true}>
            Log in
          </Button>
        )}
      </div>
    </div>
  );
}

export default Login;
