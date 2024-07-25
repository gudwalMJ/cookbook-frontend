import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/api";
import Slideshow from "../slideshow/Slideshow";
import CommentList from "../comments/CommentList";
import CommentForm from "../comments/CommentForm";
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
} from "react-share";
import { FaFacebook, FaEnvelope } from "react-icons/fa";
import { SiX } from "react-icons/si";
import LikeButton from "./LikeButton";
import RatingStars from "./RatingStars";
import FavoriteButton from "./FavoriteButton"; // Import FavoriteButton
import useFetchUser from "./UserFetcher";
import useFetchRecipe from "./RecipeFetcher";
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
  const [isFavorite, setIsFavorite] = useState(false);

  useFetchRecipe(id, setRecipe, setIsLoading, setError);
  useFetchUser(setUser, setIsFavorite, setUserLiked, setUserRating, id);

  const fetchComments = useCallback(async () => {
    try {
      const response = await API.get(`/comments/recipe/${id}`);
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
      setUserRating(rating); // Update the userRating state
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
      console.log("User liked the recipe:", true);
    } catch (error) {
      console.error(
        "Error liking recipe:",
        error.response?.data?.error || error.message
      );
    }
  };

  const handleUnlike = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.put(
        `/recipes/${id}/unlike`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        likes: response.data.likes,
      }));
      setUserLiked(false);
      console.log("User unliked the recipe:", false);
    } catch (error) {
      console.error(
        "Error unliking recipe:",
        error.response?.data?.error || error.message
      );
    }
  };

  const handleFavorite = async () => {
    try {
      const token = localStorage.getItem("token");
      let response;
      if (isFavorite) {
        response = await API.delete(`/favorites/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        response = await API.post(
          `/favorites/${id}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setIsFavorite(!isFavorite);
      console.log("Favorite status updated:", response.data);
    } catch (error) {
      console.error(
        "Error updating favorite status:",
        error.response?.data?.error || error.message
      );
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!recipe) return <p>No recipe found.</p>;

  const shareUrl = window.location.href;

  return (
    <div className="recipe-detail">
      <button className="back-button" onClick={() => navigate("/")}>
        &larr; Back to Home
      </button>
      <h1>{recipe.title}</h1>
      <Slideshow images={recipe.imageUrls} />
      <p>{recipe.description}</p>
      {user && (user._id === recipe.creator._id || user.isAdmin) && (
        <div className="button-container">
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
          <LikeButton
            userLiked={userLiked}
            handleLike={handleLike}
            handleUnlike={handleUnlike}
          />
        </li>
        <li className="rating-container">
          <strong>Rating:</strong>{" "}
          <RatingStars
            userRating={userRating}
            averageRating={recipe.averageRating}
            handleRating={handleRating}
          />
        </li>
        <li>
          <strong>Preparation Time:</strong> {recipe.preparationTime} minutes
        </li>
        <li>
          <strong>Categories:</strong> {recipe.categories.join(", ")}
        </li>
        <li>
          <FavoriteButton
            isFavorite={isFavorite}
            handleFavorite={handleFavorite}
          />
        </li>
        <li>
          <div className="share-buttons">
            <FacebookShareButton url={shareUrl} quote={recipe.title}>
              <FaFacebook size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl} title={recipe.title}>
              <SiX size={32} round />
            </TwitterShareButton>
            <EmailShareButton url={shareUrl} subject={recipe.title}>
              <FaEnvelope size={32} round />
            </EmailShareButton>
          </div>
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
