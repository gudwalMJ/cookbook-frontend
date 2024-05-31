import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return handleLogout;
};

export default useLogout;
