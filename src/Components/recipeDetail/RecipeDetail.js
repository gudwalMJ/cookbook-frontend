// src/components/recipeDetail/RecipeDetail.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../../api/api";
// import components
import Slideshow from "../slideshow/Slideshow";
// import styling
import "./RecipeDetail.css";

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    API.get(`/recipes/${id}`)
      .then((response) => {
        setRecipe(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch recipe details");
        setIsLoading(false);
      });
  }, [id]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await API.get("/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error.response.data.error);
      }
    };

    fetchUser();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!recipe) return <p>No recipe found.</p>;

  return (
    <div className="recipe-detail">
      <button className="back-button" onClick={() => navigate("/")}>
        &larr; Back to Home
      </button>
      <h1>{recipe.title}</h1>
      <Slideshow images={recipe.imageUrls} />
      <p>{recipe.description}</p>
      {user && user._id === recipe.creator && (
        <Link to={`/edit-recipe/${recipe._id}`} className="edit-button">
          Edit Recipe
        </Link>
      )}
      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.name} - {ingredient.quantity}
          </li>
        ))}
      </ul>
      <h3>Preparation Steps</h3>
      <ol>
        {recipe.preparationSteps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeDetail;
