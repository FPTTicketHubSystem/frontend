import { createContext, useReducer } from "react";
import commentReducer from "../reduces/commentReducer";
import {
  AddComment,
  DeleteComment,
  EditComment,
  GetCommentByPost,
} from "../services/PostCommentService";

const initialState = {
  loading: true,
  comments: [],
};

export const CommentContext = createContext();

const CommentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(commentReducer, initialState);
  const { loading, comments } = state;

  const addComment = async (data) => {
    try {
      await AddComment(data);
      await getCommentsByPost(data.postId);
    } catch (error) {
      console.log(error);
    }
  };

  const getCommentsByPost = async (postId) => {
    try {
      const response = await GetCommentByPost(postId);
      dispatch({
        type: "GET_COMMENTS",
        payload: response,
        loading: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const editComment = async (data) => {
    try {
      await EditComment(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await DeleteComment(commentId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CommentContext.Provider
      value={{
        loading,
        comments,
        addComment,
        getCommentsByPost,
        editComment,
        deleteComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export default CommentProvider;
