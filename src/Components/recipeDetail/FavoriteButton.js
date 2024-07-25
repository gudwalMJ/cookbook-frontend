import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import "./FavoriteButton.css";

const FavoriteButton = ({ isFavorite, handleFavorite }) => {
  return (
    <div className="favorite-button-container">
      <button className="favorite-button" onClick={handleFavorite}>
        <FontAwesomeIcon
          icon={isFavorite ? solidHeart : regularHeart}
          className="favorite-icon"
        />
      </button>
      <span className="favorite-text">
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </span>
    </div>
  );
};

export default FavoriteButton;
