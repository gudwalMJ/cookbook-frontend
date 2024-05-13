import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Import Components
import Home from "./Components/Home/Home";
import SignUp from "./Components/SignUp/signUp";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
