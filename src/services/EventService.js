import request from '../utils/request';

export const GetEventsService = async () => {
    try {
        const response = await request({
            method: "get",
            url: "event/getAllEvent",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response;
    } catch (e) {
        return e;
    }
}

export const GetEventsForAdminService = async () => {
    try {
      const response = await request({
        method: 'get',
        url: 'event/getAllEventAdmin',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response;
    } catch (e) {
      return e;
    }
}

export const GetEventsByAccountService = async (accountId) => {
    try {
        const response = await request({
            method: "get",
            url: `event/getEventByAccount?accountId=${accountId}`,
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
            url: `event/getEventById?eventId=${id}`,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response;
    } catch (e) {
        return e;
    }
}

export const GetEventByCategoryService = async (id) => {
    try {
        const response = await request({
            method: "get",
            url: `event/getEventByCategory?categoryId=${id}`,
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

export const GetEventForEdit = async (id) => {
    try {
        const response = await request({
            method: "get",
            url: `event/getEventForEdit?eventId=${id}`,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response;
    } catch (e) {
        return e;
    }
}

export const UpdateEventService = async (data) => {
    try {
        const response = await request({
            method: "post",
            url: "event/editEvent",
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

export const GetUpcomingEventService = async () => {
    try {
        const response = await request({
            method: "get",
            url: "event/getUpcomingEvent",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response;
    } catch (e) {
        return e;
    }
}

// export const DeleteEventService = async (id) => {
//     try {
//         const response = await request({
//             method: "delete",
//             url: `event/${id}`,
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });
//         return response;
//     } catch (e) {
//         return e;
//     }
// }