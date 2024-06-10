// src/components/recipeCard/RecipeCard.js
import React from "react";
import { Link } from "react-router-dom";
import "./RecipeCard.css";

const RecipeCard = ({ recipe }) => {
  const imageUrl =
    recipe.imageUrls && recipe.imageUrls.length > 0
      ? recipe.imageUrls[0]
      : "/images/placeholder.png"; // Use a placeholder image if no image URL is available

  return (
    <div className="recipe-card">
      <img src={imageUrl} alt={recipe.title} className="recipe-card-image" />
      <div className="recipe-info">
        <h3>{recipe.title}</h3>
        <p>{recipe.description}</p>
        <Link to={`/recipes/${recipe._id}`} className="view-recipe-link">
          View Recipe
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
