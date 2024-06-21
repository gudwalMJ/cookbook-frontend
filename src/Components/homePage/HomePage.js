import React from "react";
import FeaturedRecipes from "../recipeCard/FeaturedRecipes";
import MostRecentRecipes from "../recipeCard/MostRecentRecipes";
import InfoBoard from "../infoBoard/InfoBoard";
import TrendingRecipes from "../recipeCard/TrendingRecipes";
import HighestRatedRecipes from "../recipeCard/HighestRatedRecipes";
import "./HomePage.css";

const HomePage = ({ recipes, isLoading, noResults, error }) => {
  return (
    <div className="home-page">
      {isLoading && <div className="spinner"></div>}
      {noResults && <div className="no-results">No results found.</div>}
      {!noResults && recipes.length > 0 && (
        <div className="results-message">{recipes.length} recipes found.</div>
      )}
      {error && <div className="error">Error: {error}</div>}

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
