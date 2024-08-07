import React, { useEffect, useState } from "react";
import API from "../../api/api";
import RecipeCard from "../recipeCard/RecipeCard";
import "./HighestRatedRecipes.css";

const HighestRatedRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/recipes?sortBy=highestRated&limit=8")
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
    <div className="highest-rated-recipes-container">
      <h2 className="highest-rated-section-title">Highest Rated</h2>
      <div className="highest-rated-recipes">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            className="highest-rated-recipe-card"
          />
        ))}
      </div>
    </div>
  );
};

export default HighestRatedRecipes;
