import request from '../utils/request';

export const GetAllPost = async () => {
  try {
    const response = await request({
      method: 'get',
      url: 'forum/GetAllPost',
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
