import React, { useEffect, useState } from "react";
import API from "../../api/api";
import "./MostRecentRecipes.css";

const MostRecentRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/recipes?sortBy=newest&limit=8")
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching recent recipes:", error);
        setError("Failed to fetch recent recipes");
      });
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="most-recent-recipes">
      <h2 className="section-title-most-recent">Recently added</h2>
      <div className="most-recent-recipes-grid">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="most-recent-recipe-card">
            <div className="recipe-card-image-container">
              <img
                src={recipe.imageUrls[0]}
                alt={recipe.title}
                className="recipe-card-image"
              />
              <div className="recipe-card-image-overlay"></div>
            </div>
            <div className="recipe-card-info">
              <h3>{recipe.title}</h3>
              <div className="recipe-card-rating-container">
                <span className="recipe-card-rating-text">
                  {recipe.averageRating ? recipe.averageRating.toFixed(1) : 0}
                </span>
                <div className="recipe-card-star-rating">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`recipe-card-star ${
                        i < recipe.averageRating
                          ? "recipe-card-star-filled"
                          : ""
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

export default MostRecentRecipes;
