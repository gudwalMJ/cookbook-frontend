import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as solidBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons";

const FavoriteButton = ({ isFavorite, handleFavorite }) => {
  return (
    <button className="favorite-button" onClick={handleFavorite}>
      <FontAwesomeIcon
        icon={isFavorite ? solidBookmark : regularBookmark}
        color={isFavorite ? "gold" : "gray"}
      />
      {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    </button>
  );
};

export default FavoriteButton;
