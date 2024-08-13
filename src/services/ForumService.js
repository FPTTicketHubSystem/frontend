import request from '../utils/request';

export const GetAllPost = async () => {
  try {
    const response = await request({
      method: 'get',
      url: 'forum/getAllPost',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (e) {
    throw e;
  }
};
export const GetAllPostAdmin = async () => {
  try {
    const response = await request({
      method: 'get',
      url: 'forum/getAllPostAdmin',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (e) {
    throw e;
  }
};
export const ChangeStatusPost = async (postId, status) => {
  try {
    const response = await request({
      method: 'post',
      url: `forum/ChangeStatusPost`,
      params: { postId, status },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (e) {
    console.error('Error in ChangeStatusPost:', e);
    throw e;
  }
};
