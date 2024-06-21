import React, { useEffect, useState } from "react";
import API from "../../api/api";
import RecipeCard from "../recipeCard/RecipeCard";
import "./FeaturedRecipes.css";

const FeaturedRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/recipes/popular")
      .then((response) => {
        setRecipes(response.data.slice(0, 8)); // Only take top 8 recipes
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
    <div className="featured-recipes-container">
      <h2 className="section-title">Popular Right Now</h2>
      <div className="featured-recipes">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedRecipes;
