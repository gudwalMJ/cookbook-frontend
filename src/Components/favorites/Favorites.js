import React, { useEffect, useState } from "react";
import API from "../../api/api";
import RecipeCard from "../recipeCard/RecipeCard";
import "./Favorites.css";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFavorites = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await API.get("/favorites", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites(response.data);
        setIsLoading(false);
      } catch (error) {
        setError("Failed to fetch favorite recipes");
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="favorites-page">
      <h1>My Favorite Recipes</h1>
      <div className="favorites-list">
        {favorites.length === 0 ? (
          <p>No favorite recipes found.</p>
        ) : (
          favorites.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))
        )}
      </div>
    </div>
  );
};

export default Favorites;
