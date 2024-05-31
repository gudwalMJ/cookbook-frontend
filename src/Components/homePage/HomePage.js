// src/components/homePage/HomePage.js
import React, { useState } from "react";
// Components
import FeaturedRecipes from "../recipeCard/FeaturedRecipes";
import SearchBar from "../searchBar/SearchBar";
import RecipeCard from "../recipeCard/RecipeCard";
// Styling
import "./HomePage.css";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="home-page">
      <div className="search-bar">
        <SearchBar
          setRecipes={setRecipes}
          setIsLoading={setIsLoading}
          setNoResults={setNoResults}
          setError={setError}
        />
      </div>
      {isLoading && <div className="spinner"></div>}
      {noResults && <div className="no-results">No results found.</div>}
      {error && <div className="error">Error: {error}</div>}
      <div className="recipes-list">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
      <div className="featured-recipes">
        <FeaturedRecipes />
      </div>
    </div>
  );
};

export default HomePage;
