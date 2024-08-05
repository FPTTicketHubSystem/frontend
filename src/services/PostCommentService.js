import request from '../utils/request';

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
