// src/components/mostRecentRecipes/MostRecentRecipes.js
import React, { useEffect, useState } from "react";
import API from "../../api/api";
import RecipeCard from "../recipeCard/RecipeCard";
import "./MostRecentRecipes.css";

const MostRecentRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/recipes?sortBy=newest&limit=8")
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching recent recipes:", error);
        setError("Failed to fetch recent recipes");
      });
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="most-recent-recipes">
      <h2 className="section-title">Most Recent</h2>
      <div className="recipes-grid">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            className="recipe-card"
          />
        ))}
      </div>
    </div>
  );
};

export default MostRecentRecipes;
