import React, { useEffect, useState } from "react";
import API from "../../api/api";
import "./TrendingRecipes.css";

const TrendingRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/recipes?sortBy=mostPopular&limit=6")
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching trending recipes:", error);
        setError("Failed to fetch trending recipes");
      });
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="trending-recipes">
      <h2 className="trending-section-title">Trending</h2>
      <div className="trending-recipes-grid">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="trending-recipe-card">
            <img
              src={recipe.imageUrls[0]}
              alt={recipe.title}
              className="trending-recipe-card-image"
            />
            <div className="trending-recipe-info">
              <h3>{recipe.title}</h3>
              <div className="trending-recipe-rating-container">
                <span className="trending-recipe-rating-text">
                  {recipe.averageRating ? recipe.averageRating.toFixed(1) : 0}
                </span>
                <div className="trending-star-rating">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`trending-star ${
                        i < recipe.averageRating ? "trending-filled" : ""
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingRecipes;
