import React, { useState } from "react";
import API from "../../api/api";
import LikeButton from "./LikeButton"; // Import LikeButton
import "./Comment.css";

const Comment = ({ comment, fetchComments }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(comment.text);
  const [likesCount, setLikesCount] = useState(
    comment.likes ? comment.likes.length : 0
  );
  const [isLiked, setIsLiked] = useState(
    comment.likes
      ? comment.likes.includes(localStorage.getItem("userId"))
      : false
  );

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await API.put(
        `/comments/${comment._id}`,
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsEditing(false);
      fetchComments();
    } catch (error) {
      console.error(
        "Error updating comment:",
        error.response?.data?.error || error.message
      );
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/comments/${comment._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchComments();
    } catch (error) {
      console.error(
        "Error deleting comment:",
        error.response?.data?.error || error.message
      );
    }
  };

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.put(
        `/comments/${comment._id}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLikesCount(response.data.likes.length);
      setIsLiked(response.data.likes.includes(localStorage.getItem("userId")));
    } catch (error) {
      console.error(
        "Error liking comment:",
        error.response?.data?.error || error.message
      );
    }
  };

  const handleUnlike = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.put(
        `/comments/${comment._id}/unlike`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLikesCount(response.data.likes.length);
      setIsLiked(response.data.likes.includes(localStorage.getItem("userId")));
    } catch (error) {
      console.error(
        "Error unliking comment:",
        error.response?.data?.error || error.message
      );
    }
  };

  return (
    <div className="comment">
      {isEditing ? (
        <div className="edit-mode">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <button onClick={handleUpdate} className="edit-button">
            Update
          </button>
          <button onClick={() => setIsEditing(false)} className="edit-button">
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <p>{comment.text}</p>
          <p>By: {comment.author ? comment.author.username : "Unknown"}</p>
          <div className="button-group">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
            <LikeButton
              userLiked={isLiked}
              handleLike={handleLike}
              handleUnlike={handleUnlike}
              likesCount={likesCount}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
