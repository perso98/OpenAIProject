import * as React from "react";
import "../App.css";
import { NavLink } from "react-router-dom";
function Navbar() {
  return (
    <nav>
      <div className="nav-logo">
        <NavLink to="/">MS</NavLink>
      </div>
      <div className="nav-elements">
        <div className="nav-element">
          <NavLink to="/chat">Chat</NavLink>
        </div>
        <div className="nav-element">
          <NavLink to="/photogenerator">Photos</NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
