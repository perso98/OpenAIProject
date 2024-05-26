import React, { useContext } from "react";
import "../App.css";
import { AuthContext } from "../providers/AuthProvider ";
import { NavLink } from "react-router-dom";
function Navbar() {

  // Kontekst do użytkownika i wylogowania
  const { user, logout } = useContext(AuthContext);
  return (
    <nav>
      <div className="nav-logo">
        <NavLink to="/">MS</NavLink>
      </div>
      <div className="nav-elements">
        <div className="nav-element">
          <NavLink to="/chat">Chat</NavLink>
        </div>
        {user ? (
          <>
            <div className="nav-element">
              <NavLink to="/photo-generator">Create Picture</NavLink>
            </div>
            <div className="nav-element">
              {" "}
              <NavLink to="/favorites">Favorites</NavLink>{" "}
            </div>
            <div className="nav-element">
              <NavLink to="/user-pictures">Your pics</NavLink>
            </div>
          </>
        ) : null}

        <div className="nav-element">
          <NavLink to="/top">Top 20</NavLink>
        </div>
        {!user ? (
          <>
            <div className="nav-element">
              <NavLink to="/login">Login</NavLink>
            </div>
            <div className="nav-element">
              <NavLink to="/register">Register</NavLink>
            </div>
          </>
        ) : null}

        <div className="nav-element">
          {user ? (
            <NavLink to="/" onClick={() => logout()}>
              Logout
            </NavLink>
          ) : null}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
