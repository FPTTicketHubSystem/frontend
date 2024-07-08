import React, { useState, useEffect, useContext } from 'react';
import { Button, notification } from 'antd';
import Comment from './ForumComponent/Comment';
import { UserContext } from '../context/UserContext';
import { getCommentsByPostService, editCommentService, deleteCommentService } from '../services/commentService';

const CommentList = ({ idPost }) => {
  const [comments, setComments] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchComments = async () => {
      const result = await getCommentsByPostService(idPost);
      setComments(result);
    };
    fetchComments();
  }, [idPost]);

  const deleteComment = async (commentId) => {
    try {
      await deleteCommentService(commentId);
      const updatedComments = await getCommentsByPostService(idPost);
      setComments(updatedComments);

    } catch (error) {
     
    }
  };

  const editComment = async (idComment, updatedContent) => {
    try {
      await editCommentService(idComment, updatedContent);
      const updatedComments = await getCommentsByPostService(idPost);
      setComments(updatedComments);
      notification.success({
        message: "Success",
        description: "Comment edited successfully",
      });
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to edit comment",
      });
    }
  };

  return (
    <div className="comment-list">
      {comments.result && comments.result.map((comment) => (
        <div key={comment.postCommentId} className="comment-item">
          <Comment
            comment={comment}
            onEdit={(updatedContent) => editComment(comment.postCommentId, updatedContent)}
            onDelete={() => deleteComment(comment.postCommentId)}
          />
        </div>
      ))}
    </div>
  );
};


export default CommentList;
