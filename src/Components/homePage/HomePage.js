import React, { useState } from "react";
// API and Components
import API from "../../api/api";
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

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === "") {
      setRecipes([]); // Clear results or reset to default featured recipes
      setIsLoading(false);
      setNoResults(false);
      return;
    }

    setIsLoading(true);
    setError("");
    setNoResults(false);

    API.get(`/recipes/search?query=${searchTerm}`)
      .then((response) => {
        setIsLoading(false);
        setRecipes(response.data);
        if (response.data.length === 0) {
          setNoResults(true);
        }
      })
      .catch((error) => {
        console.error("Search error:", error);
        setError("Failed to perform search. Please try again.");
        setIsLoading(false);
      });
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
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
