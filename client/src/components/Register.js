import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import "../App.css";

function Register() {
  const [loginForm, setLoginForm] = useState({
    login: "",
    password: "",
    password2: "",
  });
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
        <TextField
          label="Confirm password"
          onChange={(e) =>
            setLoginForm({ ...loginForm, password2: e.target.value })
          }
        />
        {loginForm.login && loginForm.password && loginForm.password2 ? (
          <Button
            variant="contained"
            color="success"
            onClick={() => console.log(loginForm)}
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
