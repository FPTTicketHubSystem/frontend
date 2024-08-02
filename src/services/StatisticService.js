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

  export const getMonthlyRevenue = async () => {
    try {
        const response = await request({
            method: 'get',
            url: 'Statistics/monthly-revenue',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (e) {
        console.error('Error fetching monthly revenue:', e);
        throw e;
    }
};

    export const getMonthlyParticipants = async () => {
    try {
        const response = await request({
            method: 'get',
            url: 'Statistics/monthly-participants',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (e) {
        console.error('Error fetching monthly participants:', e);
        throw e;
    }
    };

  export const getTopRateEvent = async () => {
    try {
        const response = await request({
            method: 'get',
            url: 'statistics/top-rated-events',
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
            url: 'statistics/top-revenue-events',
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
            url: 'statistics/top-participants-events',
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

  export const exportEventStatisticsReport = async () => {
    try {
        const response = await request({
            method: 'get',
            url: 'statistics/export-pdf',
            headers: {
                'Accept': 'application/pdf',
            },
            responseType: 'blob',
        });
        return response;
    } catch (e) {
        console.error('Error exporting event statistics report:', e);
        throw e;
    }
};