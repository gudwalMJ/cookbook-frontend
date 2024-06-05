import React, { useState } from "react";
import API from "../../api/api";
import "./Comment.css";

const Comment = ({ comment, fetchComments }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(comment.text);
  const [likes, setLikes] = useState(comment.likes ? comment.likes.length : 0);
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
      setLikes(response.data.likes.length);
      setIsLiked(response.data.likes.includes(localStorage.getItem("userId")));
    } catch (error) {
      console.error(
        "Error liking comment:",
        error.response?.data?.error || error.message
      );
    }
  };

  return (
    <div className="comment">
      {isEditing ? (
        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>{comment.text}</p>
          <p>By: {comment.author ? comment.author.username : "Unknown"}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleLike}>
            {isLiked ? "Unlike" : "Like"} ({likes})
          </button>
        </div>
      )}
    </div>
  );
};

export default Comment;
