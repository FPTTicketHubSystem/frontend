import request from '../utils/request';

export const GetEventsService = async () => {
    try {
        const response = await request({
            method: "get",
            url: "event",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response;
    } catch (e) {
        return e;
    }
}

export const GetEventByIdService = async (id) => {
    try {
        const response = await request({
            method: "get",
            url: `event/${id}`,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response;
    } catch (e) {
        return e;
    }
}

export const AddEventService = async (data) => {
    try {
        const response = await request({
            method: "post",
            url: "event/addEvent",
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify(data),
        });
        return response;
    } catch (e) {
        return e;
    }
}

export const UpdateEventService = async (id, data) => {
    try {
        const response = await request({
            method: "put",
            url: `event/${id}`,
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify(data),
        });
        return response;
    } catch (e) {
        return e;
    }
}

export const DeleteEventService = async (id) => {
    try {
        const response = await request({
            method: "delete",
            url: `event/${id}`,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response;
    } catch (e) {
        return e;
    }
}