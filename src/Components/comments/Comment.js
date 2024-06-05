import React, { useState } from "react";
import API from "../../api/api";
import "./Comment.css";

const Comment = ({ comment, fetchComments }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(comment.text);
  const [replyText, setReplyText] = useState("");
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

  const handleReply = async () => {
    try {
      const token = localStorage.getItem("token");
      await API.post(
        `/comments/${comment._id}/reply`,
        { text: replyText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReplyText("");
      fetchComments();
    } catch (error) {
      console.error(
        "Error replying to comment:",
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
          <div className="reply-section">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Reply to this comment"
            ></textarea>
            <button onClick={handleReply}>Reply</button>
          </div>
          {comment.replies && comment.replies.length > 0 && (
            <div className="replies">
              {comment.replies.map((reply) => (
                <Comment
                  key={reply._id}
                  comment={reply}
                  fetchComments={fetchComments}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Comment;
