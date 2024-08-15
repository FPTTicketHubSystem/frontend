import request from '../utils/request';

const END_POINTS = {
  ADD_COMMENT: 'postComment/AddComment',
  GET_BY_POST: 'postComment/getCommentByPost',
  EDIT_COMMENT: 'postComment/EditComment',
  DELETE_COMMENT: 'postComment/DeleteComment'
};

export const addCommentService = async (data) => await request.post(END_POINTS.ADD_COMMENT, data);

export const getCommentsByPostService = async (postId) =>
  await request.get(`${END_POINTS.GET_BY_POST}?postId=${postId}`);

export const editCommentService = async (data) => await request.post(END_POINTS.EDIT_COMMENT, data);

export const deleteCommentService = async (commentId) => await request.post(`${END_POINTS.DELETE_COMMENT}?commentId=${commentId}`);

export const AddComment = async (comment) => {
  try {
    const response = await request({
      method: 'post',
      url: 'postComment/AddComment',
      headers: {
        'Content-Type': 'application/json',
      },
      data: comment,
    });
    return response;
  } catch (e) {
    return e;
  }
};

export const GetCommentByPost = async (postId) => {
  try {
    const response = await request({
      method: 'get',
      url: `postComment/getCommentByPost?postId=${postId}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (e) {
    return e;
  }
};

export const ChangeStatusPostcomment = async (postcommentId, status) => {
  try {
    const response = await request({
      method: 'post',
      url: `postComment/ChangeStatusPostcomment?postcommentId=${postcommentId}&status=${status}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (e) {
    return e;
  }
};

export const EditComment = async (comment) => {
  try {
    const response = await request({
      method: 'post',
      url: 'postComment/EditComment',
      headers: {
        'Content-Type': 'application/json',
      },
      data: comment,
    });
    return response;
  } catch (e) {
    return e;
  }
};

export const DeleteComment = async (commentId) => {
  try {
    const response = await request({
      method: 'post',
      url: `postComment/DeleteComment?commentId=${commentId}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (e) {
    return e;
  }
};
