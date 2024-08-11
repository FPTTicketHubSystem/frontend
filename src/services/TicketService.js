import request from '../utils/request';

const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

export const GetTicketByAccountService = async (accountId) => {
    try {
        const response = await request({
            method: "get",
            url: `ticket/getTicketByAccount?accountId=${accountId}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${getAuthToken()}`,
            },
        });
        return response;
    } catch (e) {
        return e;
    }
}

export const GetTicketByIdService = async (id) => {
    try {
        const response = await request({
            method: "get",
            url: `ticket/getTicketById?ticketId=${id}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${getAuthToken()}`,
            },
        });
        return response;
    } catch (e) {
        return e;
    }
}

