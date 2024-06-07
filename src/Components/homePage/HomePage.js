// src/components/homePage/HomePage.js
import React from "react";
// Components
import FeaturedRecipes from "../recipeCard/FeaturedRecipes";
import RecipeCard from "../recipeCard/RecipeCard";
// Styling
import "./HomePage.css";

const HomePage = ({ recipes, isLoading, noResults, error }) => {
  return (
    <div className="home-page">
      {isLoading && <div className="spinner"></div>}
      {noResults && <div className="no-results">No results found.</div>}
      {!noResults && recipes.length > 0 && (
        <div className="results-message">{recipes.length} recipes found.</div>
      )}
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
