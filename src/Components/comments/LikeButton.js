import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import "./LikeButton.css";

const LikeButton = ({ userLiked, handleLike, handleUnlike, likesCount }) => {
  return (
    <button
      className={`like-button ${userLiked ? "liked" : ""}`}
      onClick={userLiked ? handleUnlike : handleLike}
    >
      <FontAwesomeIcon icon={faThumbsUp} />
      <span>{likesCount}</span>
    </button>
  );
};

export default LikeButton;
