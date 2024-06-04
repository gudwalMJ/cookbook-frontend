import React, { useState } from "react";
import axios from "axios";
import "./Comment.css";

const Comment = ({ comment, fetchComments, setComments }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(comment.text);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `/api/comments/${comment._id}`,
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
      await axios.delete(`/api/comments/${comment._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Comment deleted successfully");
      setComments((prevComments) =>
        prevComments.filter((c) => c._id !== comment._id)
      );
    } catch (error) {
      console.error(
        "Error deleting comment:",
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
          <p>By: {comment.author.username}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Comment;
