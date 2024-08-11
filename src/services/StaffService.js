import request from "../utils/request";

const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

export const CheckinTicketService = async (ticketId, staffId) => {
    try {
        const response = await request({
            method: "get",
            url: `staff/checkInTicket?ticketId=${ticketId}&staffId=${staffId}`,
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

export const GetEventByStaffService = async (staffId) => {
    try {
        const response = await request({
            method: "get",
            url: `staff/getEventByStaff?staffId=${staffId}`,
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