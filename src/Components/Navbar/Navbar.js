import { Link } from "react-router-dom";
// Styling
import "./navbar.css";

const Navbar = () => {
  const token = localStorage.getItem("token");

  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/signup">SignUp</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      {token && (
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      )}
    </ul>
  );
};

export default Navbar;
