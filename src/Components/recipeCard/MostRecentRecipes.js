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
          <div key={recipe._id} className="most-recent-recipe-card recipe-card">
            <img
              src={recipe.imageUrls[0]}
              alt={recipe.title}
              className="most-recent-recipe-card-image recipe-card-image"
            />
            <div className="most-recent-recipe-info recipe-info">
              <h3>{recipe.title}</h3>
              <div className="recipe-rating-container">
                <span className="recipe-rating-text">
                  {recipe.averageRating ? recipe.averageRating.toFixed(1) : 0}
                </span>
                <div className="star-rating">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`star ${
                        i < recipe.averageRating ? "filled" : ""
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
