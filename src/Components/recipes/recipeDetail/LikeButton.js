import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import "./LikeButton.css";

const LikeButton = ({ userLiked, handleLike, handleUnlike }) => {
  return (
    <button
      className={`like-button ${userLiked ? "liked" : ""}`}
      onClick={userLiked ? handleUnlike : handleLike}
    >
      <FontAwesomeIcon icon={faThumbsUp} />
    </button>
  );
};

export default LikeButton;
