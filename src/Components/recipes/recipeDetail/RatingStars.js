import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import "./RatingStars.css";

const RatingStars = ({ userRating, averageRating, handleRating }) => {
  const ratingToShow = userRating > 0 ? userRating : averageRating;

  return (
    <div className="rating-stars">
      <span className="rating-value">{ratingToShow.toFixed(1)}</span>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => handleRating(star)}
          className="star-button"
        >
          <FontAwesomeIcon
            icon={ratingToShow >= star ? solidStar : regularStar}
            className={ratingToShow >= star ? "gold-star" : "gray-star"}
          />
        </button>
      ))}
    </div>
  );
};

export default RatingStars;
