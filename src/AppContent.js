import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
// Import Components
import HomePage from "./components/homePage/HomePage";
import RecipeDetail from "./components/recipeDetail/RecipeDetail.js";
import Navbar from "./components/navbar/Navbar.js";
import EditRecipe from "./components/editRecipe/EditRecipe";
import AddRecipe from "./components/addRecipe/AddRecipe";
import SearchBar from "./components/searchBar/SearchBar";
import Favorites from "./components/favorites/Favorites";
import About from "./components/aboutPage/About.js";
// User Components
import SignUp from "./components/user/signUp/SignUp.js";
import Login from "./components/user/login/Login";
import Profile from "./components/user/profile/Profile.js";
// Import Styling
import "./index.css";
import "./App.css";

const AppContent = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [error, setError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // Add darkMode state

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const location = useLocation();

  // Define paths where SearchBar should be hidden
  const hideSearchBarPaths = [
    "/login",
    "/signup",
    "/profile",
    "/favorites",
    "/about",
    "/add-recipe",
    "/edit-recipe",
  ];

  const shouldHideSearchBar =
    hideSearchBarPaths.includes(location.pathname) ||
    location.pathname.startsWith("/edit-recipe") ||
    location.pathname.startsWith("/recipes/");

  return (
    <div className={`app ${darkMode ? "dark-mode" : ""}`}>
      <Navbar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <div className={`main-content ${isSidebarOpen ? "expanded" : ""}`}>
        {!shouldHideSearchBar && (
          <SearchBar
            setRecipes={setRecipes}
            setIsLoading={setIsLoading}
            setNoResults={setNoResults}
            setError={setError}
            darkMode={darkMode}
            isSidebarOpen={isSidebarOpen}
          />
        )}
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
          <Route
            path="/recipes/:id"
            element={<RecipeDetail darkMode={darkMode} />}
          />
          <Route path="/signup" element={<SignUp darkMode={darkMode} />} />
          <Route path="/login" element={<Login darkMode={darkMode} />} />
          <Route path="/profile" element={<Profile darkMode={darkMode} />} />
          <Route path="/edit-recipe/:id" element={<EditRecipe />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/about" element={<About darkMode={darkMode} />} />
        </Routes>
      </div>
    </div>
  );
};

export default AppContent;
