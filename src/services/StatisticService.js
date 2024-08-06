import request from '../utils/request';

export const getTotalRevenue = async () => {
  try {
      const response = await request({
          method: 'get',
          url: 'Statistic/total-revenue',
          headers: {
              'Content-Type': 'application/json',
          },
      });
      return response;
  } catch (e) {
      console.error('Error fetching total revenue:', e);
      throw e;
  }
};

export const getTotalParticipants = async () => {
    try {
        const response = await request({
            method: 'get',
            url: 'Statistic/total-participants',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (e) {
        console.error('Error fetching total participants:', e);
        throw e;
    }
  };

  export const getTopRateEvent = async () => {
    try {
        const response = await request({
            method: 'get',
            url: 'Statistic/top-rated-events',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (e) {
        console.error('Error fetching total rating event:', e);
        throw e;
    }
  };

  export const getTopRevenueEvent = async () => {
    try {
        const response = await request({
            method: 'get',
            url: 'Statistic/top-revenue-events',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (e) {
        console.error('Error fetching top revenue event:', e);
        throw e;
    }
  };

  export const getTopParticipantsEvent = async () => {
    try {
        const response = await request({
            method: 'get',
            url: 'Statistic/top-participants-events',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (e) {
        console.error('Error fetching top participants event:', e);
        throw e;
    }
  };