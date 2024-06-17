import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const LikeButton = ({ userLiked, handleLike, handleUnlike }) => {
  return (
    <>
      {!userLiked ? (
        <button onClick={handleLike}>
          <FontAwesomeIcon icon={faHeart} color="gray" />
        </button>
      ) : (
        <button onClick={handleUnlike}>
          <FontAwesomeIcon icon={faHeart} color="red" />
        </button>
      )}
    </>
  );
};

export default LikeButton;
