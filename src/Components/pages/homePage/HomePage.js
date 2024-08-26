import React from "react";
import FeaturedRecipes from "../../recipes/recipeCard/FeaturedRecipes";
import MostRecentRecipes from "../../recipes/recipeCard/MostRecentRecipes";
import InfoBoard from "../../infoBoard/InfoBoard";
import TrendingRecipes from "../../recipes/recipeCard/TrendingRecipes";
import HighestRatedRecipes from "../../recipes/recipeCard/HighestRatedRecipes";
import RecipeCard from "../../recipes/recipeCard/RecipeCard";
import "./HomePage.css";

const HomePage = ({ recipes, isLoading, noResults, error }) => {
  return (
    <div className="home-page">
      {isLoading && <div className="spinner"></div>}
      {noResults && <div className="no-results">No results found.</div>}
      {!noResults && recipes.length > 0 && (
        <>
          <div className="results-message">{recipes.length} recipes found.</div>
          <div className="search-results">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
                className="search-result-card"
              />
            ))}
          </div>
        </>
      )}
      {error && <div className="error">Error: {error}</div>}

      <div className="inspiration-section">
        <h2>
          Get inspired by one of many{" "}
          <span className="highlighted-text">Tasty Tales</span>
        </h2>
      </div>

      <FeaturedRecipes />
      <div className="content-section">
        <div className="most-recent">
          <MostRecentRecipes />
        </div>
        <div className="info-board-trending">
          <InfoBoard />
          <TrendingRecipes />
        </div>
      </div>
      <HighestRatedRecipes />
    </div>
  );
};

export default HomePage;
