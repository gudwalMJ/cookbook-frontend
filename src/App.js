import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Import Components
import HomePage from "./components/homePage/HomePage";
import RecipeDetail from "./components/recipeDetail/RecipeDetail.js";
import Navbar from "./components/navbar/Navbar.js";
import EditRecipe from "./components/editRecipe/EditRecipe";
import SearchBar from "./components/searchBar/SearchBar";
import Favorites from "./components/favorites/Favorites";
// User Components
import SignUp from "./components/user/signUp/SignUp.js";
import Login from "./components/user/login/Login";
import Profile from "./components/user/profile/Profile.js";
// Import Styling
import "./index.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [error, setError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div>
        <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`main-content ${isSidebarOpen ? "expanded" : ""}`}>
          <SearchBar
            setRecipes={setRecipes}
            setIsLoading={setIsLoading}
            setNoResults={setNoResults}
            setError={setError}
          />
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  recipes={recipes}
                  isLoading={isLoading}
                  noResults={noResults}
                  error={error}
                />
              }
            />
            <Route path="/recipes/:id" element={<RecipeDetail />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit-recipe/:id" element={<EditRecipe />} />
            <Route path="/favorites" element={<Favorites />} />{" "}
            {/* Add the Favorites route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
