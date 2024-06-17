// src/components/recipeCard/RecipeCard.js
import React from "react";
import { Link } from "react-router-dom";
import "./RecipeCard.css";

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={`star ${i <= rating ? "filled" : ""}`}>
        &#9733;
      </span>
    );
  }
  return <div className="star-rating">{stars}</div>;
};

const RecipeCard = ({ recipe, showRating }) => {
  const imageUrl =
    recipe.imageUrls && recipe.imageUrls.length > 0
      ? recipe.imageUrls[0]
      : "/images/placeholder.png"; // Use a placeholder image if no image URL is available

  return (
    <div className="recipe-card">
      <img src={imageUrl} alt={recipe.title} className="recipe-card-image" />
      <div className="recipe-info">
        <h3>{recipe.title}</h3>
        {showRating && recipe.averageRating && (
          <div className="recipe-rating-container">
            <span className="recipe-rating-text">
              ({recipe.averageRating.toFixed(1)})
            </span>
            <StarRating rating={recipe.averageRating} />
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
