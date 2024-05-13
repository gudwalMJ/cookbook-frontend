import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Import Components
import HomePage from "./components/homePage/HomePage";
import SignUp from "./components/signUp/signUp";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
