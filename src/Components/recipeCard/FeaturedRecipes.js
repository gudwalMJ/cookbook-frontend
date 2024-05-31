// src/components/recipeCard/FeaturedRecipes.js
import React, { useEffect, useState } from "react";
import API from "../../api/api";
import RecipeCard from "../recipeCard/RecipeCard";
import "./FeaturedRecipes.css"; // Import the CSS for styling

const FeaturedRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/recipes/popular")
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching popular recipes:", error);
        setError("Failed to fetch popular recipes");
      });
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="featured-recipes">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe._id} recipe={recipe} />
      ))}
    </div>
  );
};

export default FeaturedRecipes;
