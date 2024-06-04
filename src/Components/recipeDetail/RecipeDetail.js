import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/api";
// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faStar as solidStar,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
// import components
import Slideshow from "../slideshow/Slideshow";
import CommentList from "../comments/CommentList";
import CommentForm from "../comments/CommentForm";
// import styling
import "./RecipeDetail.css";

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [userLiked, setUserLiked] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    API.get(`/recipes/${id}`)
      .then((response) => {
        console.log("Recipe Data:", response.data); // Debugging
        setRecipe(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch recipe details:", err); // Debugging
        setError("Failed to fetch recipe details");
        setIsLoading(false);
      });
  }, [id]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await API.get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("User Data:", response.data); // Debugging
        setUser(response.data);
      } catch (error) {
        console.error(
          "Error fetching user:",
          error.response?.data?.error || error.message
        ); // Debugging
      }
    };

    fetchUser();
  }, []);

  const fetchComments = useCallback(async () => {
    try {
      const response = await API.get(`/comments/recipe/${id}`);
      console.log("Comments Data:", response.data); // Debugging
      setComments(response.data);
    } catch (error) {
      console.error(
        "Error fetching comments:",
        error.response?.data?.error || error.message
      );
    }
  }, [id]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleRating = async (rating) => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.post(
        `/recipes/${id}/rate`,
        { rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        averageRating: parseFloat(response.data.averageRating),
      }));
      setUserRating(rating);
    } catch (error) {
      console.error(
        "Error submitting rating:",
        error.response?.data?.error || error.message
      );
    }
  };

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.put(
        `/recipes/${id}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        likes: response.data.likes,
      }));
      setUserLiked(true);
    } catch (error) {
      console.error(
        "Error liking recipe:",
        error.response?.data?.error || error.message
      );
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!recipe) return <p>No recipe found.</p>;

  console.log("Current User:", user); // Debugging
  console.log("Recipe Creator:", recipe.creator); // Debugging

  return (
    <div className="recipe-detail">
      <button className="back-button" onClick={() => navigate("/")}>
        &larr; Back to Home
      </button>
      <h1>{recipe.title}</h1>
      <Slideshow images={recipe.imageUrls} />
      <p>{recipe.description}</p>
      {user && (user._id === recipe.creator._id || user.isAdmin) && (
        <div>
          <button
            onClick={() => navigate(`/edit-recipe/${recipe._id}`)}
            className="edit-button"
          >
            Edit Recipe
          </button>
          <button
            onClick={async () => {
              try {
                const token = localStorage.getItem("token");
                await API.delete(`/recipes/${recipe._id}`, {
                  headers: { Authorization: `Bearer ${token}` },
                });
                alert("Recipe deleted successfully");
                navigate("/");
              } catch (error) {
                console.error(
                  "Error deleting recipe:",
                  error.response?.data?.error || error.message
                );
              }
            }}
            className="delete-button"
          >
            Delete Recipe
          </button>
        </div>
      )}
      <h3>Details</h3>
      <ul>
        <li>
          <strong>Servings:</strong> {recipe.servings}
        </li>
        <li>
          <strong>Difficulty:</strong> {recipe.difficulty}
        </li>
        <li>
          <strong>Likes:</strong> {recipe.likes}
          <button onClick={handleLike} disabled={userLiked}>
            <FontAwesomeIcon
              icon={faHeart}
              color={userLiked ? "red" : "gray"}
            />
          </button>
        </li>
        <li>
          <strong>Star Rating:</strong>{" "}
          {recipe.averageRating ? recipe.averageRating.toFixed(2) : 0}
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRating(star)}
              disabled={userRating === star}
            >
              <FontAwesomeIcon
                icon={userRating >= star ? solidStar : regularStar}
                color={userRating >= star ? "gold" : "gray"}
              />
            </button>
          ))}
        </li>
        <li>
          <strong>Preparation Time:</strong> {recipe.preparationTime} minutes
        </li>
        <li>
          <strong>Categories:</strong> {recipe.categories.join(", ")}
        </li>
      </ul>
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
      <h3>Comments</h3>
      <CommentForm recipeId={id} fetchComments={fetchComments} />
      <CommentList comments={comments} fetchComments={fetchComments} />
    </div>
  );
};

export default RecipeDetail;
