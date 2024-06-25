import request from '../utils/request';

export const TrafficDataService = async (data) => {
  try {
    const respone = await request({
      method: 'get',
      url: `forum/GetAllPost`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    });
    return respone;
  } catch (e) {
    return e;
  }
};

export const AddPost = async (data) => {
  try {
    const response = await request({
      method: 'post',
      url: 'forum/addPost',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    });
    return response;
  } catch (e) {
    return e;
  }
};

export const EditPost = async (idPost, editpost) => {
  try {
    const response = await request({
      method: 'post',
      url: `forum/editPost?idPost=${idPost}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(editpost),
    });

    return response.data; // Assuming your response contains data field
  } catch (error) {
    throw error; // Handle or rethrow the error as needed
  }
};

export const DeletePost = async (idPost) => {
  try {
    const respone = await request({
      method: 'post',
      url: `forum/deletePost?idPost=${idPost}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(respone);
    return respone;
  } catch (e) {
    return e;
  }
};