import React from "react";
import Comment from "./Comment";

const CommentList = ({ comments, fetchComments }) => {
  console.log("Rendering comments:", comments); // Debugging
  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <Comment
          key={comment._id}
          comment={comment}
          fetchComments={fetchComments}
        />
      ))}
    </div>
  );
};

export default CommentList;
