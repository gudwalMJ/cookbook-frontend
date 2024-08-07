import React, { useState } from "react";
import API from "../../api/api";
import "./Comment.css"; // Import the CSS file

const CommentForm = ({ recipeId, fetchComments }) => {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await API.post(
        "/comments",
        { text, recipeId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setText("");
      fetchComments();
    } catch (error) {
      console.error(
        "Error adding comment:",
        error.response?.data?.error || error.message
      );
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment"
        required
      ></textarea>
      <button type="submit" className="submit-comment-btn">
        Submit
      </button>
    </form>
  );
};

export default CommentForm;
