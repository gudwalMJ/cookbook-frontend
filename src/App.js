// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Import Components
import HomePage from "./components/homePage/HomePage";
import RecipeDetail from "./components/recipeDetail/RecipeDetail";
import Navbar from "./components/navbar/Navbar";
import EditRecipe from "./components/editRecipe/EditRecipe";
import SearchBar from "./components/searchBar/SearchBar";
// User Components
import SignUp from "./components/user/signUp/SignUp";
import Login from "./components/user/login/Login";
import Profile from "./components/user/profile/Profile";
// Import Styling
import "./index.css";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [error, setError] = useState("");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div>
        <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <SearchBar
          setRecipes={setRecipes}
          setIsLoading={setIsLoading}
          setNoResults={setNoResults}
          setError={setError}
        />
        <div className={`main-content ${isSidebarOpen ? "expanded" : ""}`}>
          {isLoading && <div className="spinner"></div>}
          {noResults && (
            <div className="no-results">
              No recipes found for the selected criteria.
            </div>
          )}
          {!isLoading && !noResults && recipes.length > 0 && (
            <div className="results-info">
              Found {recipes.length} recipe(s).
            </div>
          )}
          {error && <div className="error">Error: {error}</div>}
          <Routes>
            <Route
              path="/"
              element={<HomePage recipes={recipes} setRecipes={setRecipes} />}
            />
            <Route path="/recipes/:id" element={<RecipeDetail />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit-recipe/:id" element={<EditRecipe />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
