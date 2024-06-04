import React, { useEffect, useState } from "react";
import axios from "axios";
import Comment from "./Comment";

const CommentList = ({ recipeId, fetchComments }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchCommentsData = async () => {
      try {
        const response = await axios.get(`/api/comments/recipe/${recipeId}`);
        setComments(response.data);
      } catch (error) {
        console.error(
          "Error fetching comments:",
          error.response?.data?.error || error.message
        );
      }
    };

    fetchCommentsData();
  }, [recipeId, fetchComments]);

  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <Comment
          key={comment._id}
          comment={comment}
          fetchComments={fetchComments}
          setComments={setComments}
        />
      ))}
    </div>
  );
};

export default CommentList;
