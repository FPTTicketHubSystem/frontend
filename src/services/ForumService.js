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
