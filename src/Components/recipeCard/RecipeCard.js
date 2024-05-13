import React from "react";
import "./RecipeCard.css";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <img
        src={recipe.imageUrls[0]}
        alt={recipe.title}
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
      />
      <div className="recipe-info">
        <h3>{recipe.title}</h3>
        <p>{recipe.description}</p>
        <button>View Recipe</button>
      </div>
    </div>
  );
};

export default RecipeCard;
