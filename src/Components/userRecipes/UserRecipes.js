import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import RecipeCard from "../recipeCard/RecipeCard";
import "./UserRecipes.css";

const UserRecipes = ({ userId }) => {
  const [recipes, setRecipes] = useState([]);

  const fetchUserRecipes = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`/api/recipes?creator=${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error.response.data.error);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchUserRecipes();
    }
  }, [userId, fetchUserRecipes]);

  const handleEditRecipe = (recipeId) => {
    // Navigate to the edit recipe page
    window.location.href = `/edit-recipe/${recipeId}`;
  };

  return (
    <div className="user-recipes-container">
      <h2 className="user-recipes-title">Your Recipes</h2>
      <div className="user-recipes-grid">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            onEdit={() => handleEditRecipe(recipe._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default UserRecipes;
