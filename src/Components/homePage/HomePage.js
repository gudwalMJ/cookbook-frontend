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
    <div>
      <SearchBar
        setRecipes={setRecipes}
        setIsLoading={setIsLoading}
        setNoResults={setNoResults}
        setError={setError}
      />
      {isLoading && <div className="spinner"></div>}
      {noResults && <div>No results found.</div>}
      {error && <div>Error: {error}</div>}
      {recipes.map((recipe) => (
        <RecipeCard key={recipe._id} recipe={recipe} />
      ))}
      <FeaturedRecipes />
    </div>
  );
};

export default HomePage;
