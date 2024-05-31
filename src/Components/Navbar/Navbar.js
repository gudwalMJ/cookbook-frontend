import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHome,
  faUserPlus,
  faSignInAlt,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import useLogout from "../user/logout/Logout";
import "./navbar.css";

const Navbar = ({ isSidebarOpen, toggleSidebar }) => {
  const token = localStorage.getItem("token");
  const handleLogout = useLogout(); // Use the logout logic

  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <ul>
        <li>
          <Link to="/">
            <FontAwesomeIcon icon={faHome} />
            {isSidebarOpen && <span>Home</span>}
          </Link>
        </li>
        {!token ? (
          <>
            <li>
              <Link to="/signup">
                <FontAwesomeIcon icon={faUserPlus} />
                {isSidebarOpen && <span>SignUp</span>}
              </Link>
            </li>
            <li>
              <Link to="/login">
                <FontAwesomeIcon icon={faSignInAlt} />
                {isSidebarOpen && <span>Login</span>}
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/profile">
                <FontAwesomeIcon icon={faUser} />
                {isSidebarOpen && <span>Profile</span>}
              </Link>
            </li>
            <li>
              <button onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} />
                {isSidebarOpen && <span>Logout</span>}
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
