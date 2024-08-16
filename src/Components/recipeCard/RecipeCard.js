import React from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa"; // Import the edit icon from react-icons
import "./RecipeCard.css";

const RecipeCard = ({ recipe, className, onEdit }) => {
  const imageUrl =
    recipe.imageUrls && recipe.imageUrls.length > 0
      ? recipe.imageUrls[0]
      : "/images/placeholder.png"; // Use a placeholder image if no image URL is available
  const rating = recipe.averageRating || 0; // Use averageRating from the backend

  return (
    <div className={`recipe-card ${className}`}>
      <Link to={`/recipes/${recipe._id}`} className="recipe-card-link">
        <div className="recipe-card-image-container">
          <img
            src={imageUrl}
            alt={recipe.title}
            className="recipe-card-image"
          />
          <div className="recipe-card-image-overlay"></div>
        </div>
        <div className="recipe-card-info">
          <h3>{recipe.title}</h3>
          <div className="recipe-card-rating-container">
            <span className="recipe-card-rating-text">{rating.toFixed(1)}</span>
            <div className="recipe-card-star-rating">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`recipe-card-star ${
                    i < rating ? "recipe-card-star-filled" : ""
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
      {onEdit && (
        <button className="recipe-card-edit-button" onClick={onEdit}>
          <FaEdit />
        </button>
      )}
    </div>
  );
};

export default RecipeCard;
