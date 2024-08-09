import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
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
  const hideSearchBarPaths = ["/login", "/signup", "/profile"];

  const shouldHideSearchBar = hideSearchBarPaths.includes(location.pathname);

  return (
    <div className={`app ${darkMode ? "dark-mode" : ""}`}>
      {" "}
      {/* Apply dark mode class */}
      <Navbar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <div className={`main-content ${isSidebarOpen ? "expanded" : ""}`}>
        {/* Conditionally render SearchBar */}
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
          <Route path="/favorites" element={<Favorites />} />{" "}
          {/* Add the Favorites route */}
        </Routes>
      </div>
    </div>
  );
};

export default AppContent;
