import request from '../utils/request';

const END_POINTS = {
  GET_ALL_POST: 'forum/GetAllPost',
  GET_BY_ID: 'forum/getPostDetail',
  ADD_POST: 'forum/AddPost',
  GET_BY_STATUS: 'forum/GetPostByStatus',
  CHANGE_POST_STATUS: 'forum/ChangeStatusPost',
  LIKE_POST: '/forum/LikePost',
  UNLIKE_POST: '/forum/UnlikePost',
  DELETE_POST: '/forum/DeletePost',
  SAVE_POST: '/forum/SavePost',
  UNSAVE_POST: '/forum/UnSavePost',
  GET_SAVED_POST: '/forum/GetSavedPostByAccount'
};

export const getAllPostService = async () => await request.get(END_POINTS.GET_ALL_POST);

export const getPostByIdService = async (postId) => await request.get(`${END_POINTS.GET_BY_ID}?postId=${postId}`);

export const addPostService = async (data) => await request.post(END_POINTS.ADD_POST, data);

export const getPostByStatusService = async (status, accountId) =>
  await request.get(`${END_POINTS.GET_BY_STATUS}?status=${status}&accountId=${accountId}`);

export const deletePostService = async (postId) => await request.post(`${END_POINTS.DELETE_POST}?postId=${postId}`);

export const changePostStatusService = async (postId, status) => await request.post(`${END_POINTS.CHANGE_POST_STATUS}?postId=${postId}&status=${status}`);

export const likePostService = async (postId, accountId) => await request.post(`${END_POINTS.LIKE_POST}?postId=${postId}&accountId=${accountId}`);

export const unlikePostService = async (postId, accountId) => await request.delete(`${END_POINTS.UNLIKE_POST}?postId=${postId}&accountId=${accountId}`);

export const savePostService = async (postId, accountId) => await request.post(`${END_POINTS.SAVE_POST}?postId=${postId}&accountId=${accountId}`);

export const unSavePostService = async (postId, accountId) => await request.delete(`${END_POINTS.UNSAVE_POST}?postId=${postId}&accountId=${accountId}`);

export const getSavedPostService = async (accountId) => await request.get(`${END_POINTS.GET_SAVED_POST}?accountId=${accountId}`);

export const GetAllPost = async () => {
  try {
    const response = await request({
      method: 'get',
      url: `forum/GetAllPost`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (e) {
    return e;
  }
};

export const GetPostById = async (postId) => {
  try {
    const response = await request({
      method: 'get',
      url: `forum/getPostDetail?postId=${postId}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (e) {
    return e;
  }
};

export const AddPost = async (post) => {
  try {
    const response = await request({
      method: 'post',
      url: 'forum/AddPost',
      headers: {
        'Content-Type': 'application/json',
      },
      data: post,
    });
    return response;
  } catch (e) {
    return e;
  }
};

export const ChangeStatusPost = async (postId, status) => {
  try {
    const response = await request({
      method: 'post',
      url: `forum/ChangeStatusPost?postId=${postId}&status=${status}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (e) {
    return e;
  }
};

export const EditPost = async (post) => {
  try {
    const response = await request({
      method: 'post',
      url: 'forum/EditPost',
      headers: {
        'Content-Type': 'application/json',
      },
      data: post,
    });
    return response;
  } catch (e) {
    return e;
  }
};

export const GetPostByStatus = async (status, accountId) => {
  try {
    const response = await request({
      method: 'get',
      url: `forum/GetPostByStatus?status=${status}&accountId=${accountId}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (e) {
    return e;
  }
};

export const CountComment = async (postId) => {
  try {
    const response = await request({
      method: 'get',
      url: `forum/CountCommentByPost?postId=${postId}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (e) {
    return e;
  }
};

export const CountLikedNumberByPost = async (postId) => {
  try {
    const response = await request({
      method: 'get',
      url: `forum/CountLikedNumberByPost?postId=${postId}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (e) {
    return e;
  }
};

export const LikePost = async (postId, accountId) => {
  try {
    const response = await request({
      method: 'post',
      url: `forum/LikePost?postId=${postId}&accountId=${accountId}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (e) {
    return e;
  }
};

export const UnlikePost = async (postId, accountId) => {
  try {
    const response = await request({
      method: 'delete',
      url: `forum/UnlikePost?postId=${postId}&accountId=${accountId}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (e) {
    return e;
  }
};

export const DeletePost = async (postId) => {
  try {
    const response = await request({
      method: 'post',
      url: `forum/DeletePost?postId=${postId}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (e) {
    return e;
  }
};

export const RejectPost = async (postId) => {
  try {
    const response = await request({
      method: 'post',
      url: `forum/RejectPost?postId=${postId}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (e) {
    return e;
  }
};

export const SavePost = async (postId, accountId) => {
  try {
    const response = await request({
      method: 'post',
      url: `forum/SavePost?postId=${postId}&accountId=${accountId}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (e) {
    return e;
  }
};

export const UnsavePost = async (postId, accountId) => {
  try {
    const response = await request({
      method: 'delete',
      url: `forum/UnSavePost?postId=${postId}&accountId=${accountId}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (e) {
    return e;
  }
};

export const GetSavedPostByAccount = async (accountId) => {
  try {
    const response = await request({
      method: 'get',
      url: `forum/GetSavedPostByAccount?accountId=${accountId}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (e) {
    return e;
  }
};
