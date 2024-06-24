import React from "react";
import { Link } from "react-router-dom";
import "./RecipeCard.css";

const RecipeCard = ({ recipe, className }) => {
  const imageUrl =
    recipe.imageUrls && recipe.imageUrls.length > 0
      ? recipe.imageUrls[0]
      : "/images/placeholder.png"; // Use a placeholder image if no image URL is available
  const rating = recipe.averageRating || 0; // Use averageRating from the backend

  return (
    <Link to={`/recipes/${recipe._id}`} className={`recipe-card ${className}`}>
      <img src={imageUrl} alt={recipe.title} className="recipe-card-image" />
      <div className="recipe-info">
        <h3>{recipe.title}</h3>
        <div className="recipe-rating-container">
          <span className="recipe-rating-text">{rating.toFixed(1)}</span>
          <div className="star-rating">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`star ${i < rating ? "filled" : ""}`}>
                ★
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
