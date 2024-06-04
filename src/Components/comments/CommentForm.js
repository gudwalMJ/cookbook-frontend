import React, { useState } from "react";
import axios from "axios";

const CommentForm = ({ recipeId, fetchComments }) => {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/api/comments",
        { text, recipeId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setText("");
      fetchComments(); // Fetch comments to refresh the list after posting a new comment
    } catch (error) {
      console.error(
        "Error adding comment:",
        error.response?.data?.error || error.message
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment"
        required
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;
