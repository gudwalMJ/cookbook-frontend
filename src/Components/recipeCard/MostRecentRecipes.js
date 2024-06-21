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
      <h2 className="section-title">Most Recent</h2>
      <div className="most-recent-recipes-grid">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="most-recent-recipe-card">
            <img
              src={recipe.imageUrls[0]}
              alt={recipe.title}
              className="most-recent-recipe-card-image"
            />
            <div className="most-recent-recipe-info">
              <h3>{recipe.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostRecentRecipes;
