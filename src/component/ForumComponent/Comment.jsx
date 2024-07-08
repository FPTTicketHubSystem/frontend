import React, { useState } from "react";
import { Input, Button, notification, Menu, Dropdown } from "antd";
import {useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import '../../assets/css/forums.css';
import {  deleteCommentService } from '../../services/commentService';
const defaultAvatar = "../Image/Avatar_null.png";
const Comment = ({ comment, onEdit, onDelete }) => {
  const { user } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(comment);
  };

  const handleSaveEdit = () => {
    onEdit(editedContent);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditedContent(e.target.value);
  };

  const handleDelete = async () => {
    try {
      await deleteCommentService(comment.postCommentId);
      onDelete(comment.postCommentId);
      notification.success({
        message: "Success",
        description: "Comment deleted successfully",
      });
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to delete comment",
      });
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="edit" onClick={handleEdit}>
        Edit
      </Menu.Item>
      <Menu.Item key="delete" onClick={handleDelete}>
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      {isEditing ? (
        <div>
          <Input value={editedContent.content} onChange={handleChange} />
          <Button onClick={handleSaveEdit}>Save</Button>
          <Button onClick={handleCancelEdit}>Cancel</Button>
        </div>
      ) : (
        <div className="container-edit-comment">
        <span className="left-side">{comment.content}</span>
        {user && user.accountId === comment.accountId && (
          <Dropdown overlay={menu} trigger={['click']}>
            <p className="right-side">...</p>
          </Dropdown>
        )}
      </div>
      )}
    </div>
  );
};



export default Comment;

