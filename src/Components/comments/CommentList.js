import React from "react";
import Comment from "./Comment";
import "./Comment.css"; // Import the CSS file

const CommentList = ({ comments, fetchComments }) => {
  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <Comment
          key={comment._id} // Ensure each top-level comment has a unique key
          comment={comment}
          fetchComments={fetchComments}
        />
      ))}
    </div>
  );
};

export default CommentList;
