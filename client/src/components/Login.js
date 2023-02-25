import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import "../App.css";
function Login() {
  const [loginForm, setLoginForm] = useState({ login: "", password: "" });
  return (
    <div className="login-container">
      <div className="login-elements">
        <TextField
          label="Login"
          onChange={(e) =>
            setLoginForm({ ...loginForm, login: e.target.value })
          }
        />
        <TextField
          label="Password"
          onChange={(e) =>
            setLoginForm({ ...loginForm, password: e.target.value })
          }
        />
        {loginForm.login && loginForm.password ? (
          <Button
            variant="contained"
            color="success"
            onClick={() => console.log(loginForm)}
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
