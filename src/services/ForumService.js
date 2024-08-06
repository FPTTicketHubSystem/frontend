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
