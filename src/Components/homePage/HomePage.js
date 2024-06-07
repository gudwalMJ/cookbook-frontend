import React from "react";
// Components
import FeaturedRecipes from "../recipeCard/FeaturedRecipes";
import RecipeCard from "../recipeCard/RecipeCard";
// Styling
import "./HomePage.css";

const HomePage = ({ recipes }) => {
  return (
    <div className="home-page">
      <div className="recipes-list">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
      <div className="featured-recipes">
        <FeaturedRecipes />
      </div>
    </div>
  );
};

export default HomePage;
