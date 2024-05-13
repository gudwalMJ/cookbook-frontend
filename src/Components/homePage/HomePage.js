import React, { useState } from "react";
// API and Components
import API from "../../api/api";
import Navbar from "../navbar/Navbar";
import FeaturedRecipes from "../recipeCard/FeaturedRecipes"; // Corrected path
import SearchBar from "../searchBar/SearchBar";
import RecipeCard from "../recipeCard/RecipeCard";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  const handleSearch = (searchTerm) => {
    API.get(`/recipes/search?query=${searchTerm}`)
      .then((response) => setRecipes(response.data))
      .catch((error) => console.error("Search error:", error));
  };

  return (
    <>
      <div>
        <Navbar />
        <SearchBar onSearch={handleSearch} />
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
        <FeaturedRecipes />
      </div>
    </>
  );
};

export default HomePage;
