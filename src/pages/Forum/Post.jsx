import React, { useState, useEffect } from "react";
import { LikePost } from "../../services/ForumService";
import { AddComment } from "../../services/PostCommentService";
import styles from "../../assets/css/Post.module.css";

const Post = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [userAvatar, setUserAvatar] = useState("");

  useEffect(() => {
    if (post) {
      setComments(post.postcomments || []);
      setLikes(post.countLike || 0);
      setUserAvatar(post.avatar || "");
    }
  }, [post]);

  const handleLike = async () => {
    try {
      const response = await LikePost(post.postId, post.accountId);
      if (response.status === 200) {
        setLikes((prevLikes) => prevLikes + 1);
      } else {
        console.error("Failed to like post");
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentData = {
      postId: post.postId,
      accountId: post.accountId,
      content: newComment,
      status: "Uploaded",
    };

    try {
      const response = await AddComment(commentData);
      if (response.status === 200) {
        setComments((prevComments) => [
          ...prevComments,
          {
            postCommentId: Date.now(),
            fullName: "Current User",
            content: newComment,
          },
        ]);
        setNewComment("");
      } else {
        console.error("Failed to add comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.post}>
      <div className={styles.postHeader}>
        <div className={styles.avatar}>
          <img src={post.avatar || "/default-avatar.png"} alt="User avatar" />
        </div>
        <h3>
          {post.fullName} •{" "}
          <span>
            {post.createDate
              ? new Date(post.createDate).toLocaleString()
              : "Chưa xác định"}
          </span>
        </h3>
        <p className={styles.event}>{post.status}</p>
      </div>
      <div className={styles.content}>
        <p>{post.postText}</p>
        {post.postFile && <img src={post.postFile} alt="Post file" />}
      </div>
      <div className={styles.postFooter}>
        <button className={styles.likeButton} onClick={handleLike}>
          <i className="icon-thumbs-up"></i> {likes}
        </button>
        <div className={styles.comments}>
          {comments.map((comment) => (
            <div key={comment.postCommentId} className={styles.comment}>
              <strong>{comment.fullName}:</strong> {comment.content}
            </div>
          ))}
          <div className={styles.commentInputWrapper}>
            <div className={styles.avatar}>
              <img src={userAvatar} alt="User avatar" />
            </div>
            <input
              type="text"
              placeholder="Bình luận gì đó đi..."
              className={styles.commentInput}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button className={styles.sendButton} onClick={handleCommentSubmit}>
              Gửi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
