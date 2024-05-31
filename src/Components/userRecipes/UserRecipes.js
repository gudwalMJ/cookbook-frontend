import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserRecipes.css";

const UserRecipes = ({ userId }) => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

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

  return (
    <div className="user-recipes">
      <h2>Your Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id} className="recipe-item">
            <Link to={`/recipes/${recipe._id}`}>{recipe.title}</Link>
            <button
              onClick={() => navigate(`/edit-recipe/${recipe._id}`)}
              className="edit-button"
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserRecipes;
