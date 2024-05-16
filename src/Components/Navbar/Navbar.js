import React from "react";
import { Link, useNavigate } from "react-router-dom";
// Styling
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      {!token ? (
        <>
          <li>
            <Link to="/signup">SignUp</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </>
      )}
    </ul>
  );
};

export default Navbar;
