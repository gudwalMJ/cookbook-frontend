import React, { useEffect, useState } from "react";
import API from "../../api/api"; // Corrected import path
import RecipeCard from "../recipeCard/RecipeCard";
import "./HighestRatedRecipes.css";

const HighestRatedRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/recipes?sortBy=highestRated&limit=6")
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching highest rated recipes:", error);
        setError("Failed to fetch highest rated recipes");
      });
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="highest-rated-recipes">
      <h2 className="section-title">Highest Rated</h2>
      <div className="recipes-grid">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default HighestRatedRecipes;
