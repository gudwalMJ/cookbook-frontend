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
  faBookmark,
  faQuestionCircle,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import useLogout from "../user/logout/Logout";
import logo from "../../assets/images/logo.webp"; // Ensure the path to your logo is correct
import "./navbar.css";

const Navbar = ({ isSidebarOpen, toggleSidebar, darkMode, setDarkMode }) => {
  const token = localStorage.getItem("token");
  const handleLogout = useLogout();

  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className="logo-container">
          <img src={logo} alt="TastyTales Logo" className="logo" />
        </div>
      </div>
      <ul>
        <li>
          <Link to="/" className="nav-link">
            <FontAwesomeIcon icon={faHome} />
            {isSidebarOpen && <span>Home</span>}
          </Link>
        </li>
        {!token ? (
          <>
            <li>
              <Link to="/signup" className="nav-link">
                <FontAwesomeIcon icon={faUserPlus} />
                {isSidebarOpen && <span>SignUp</span>}
              </Link>
            </li>
            <li>
              <Link to="/login" className="nav-link">
                <FontAwesomeIcon icon={faSignInAlt} />
                {isSidebarOpen && <span>Login</span>}
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/profile" className="nav-link">
                <FontAwesomeIcon icon={faUser} />
                {isSidebarOpen && <span>Profile</span>}
              </Link>
            </li>
            <li>
              <Link to="/favorites" className="nav-link">
                <FontAwesomeIcon icon={faBookmark} />
                {isSidebarOpen && <span>Favorites</span>}
              </Link>
            </li>
            <li>
              <Link to="/help" className="nav-link">
                <FontAwesomeIcon icon={faQuestionCircle} />
                {isSidebarOpen && <span>Help</span>}
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="nav-link">
                <FontAwesomeIcon icon={faSignOutAlt} />
                {isSidebarOpen && <span>Logout</span>}
              </button>
            </li>
          </>
        )}
      </ul>
      <div className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
        <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
        {isSidebarOpen && <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>}
      </div>
    </div>
  );
};

export default Navbar;
