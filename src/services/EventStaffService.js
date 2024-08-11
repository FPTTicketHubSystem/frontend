import request from '../utils/request';

const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const RegisterStaffService = async (data) => {
  try {
    const respone = await request({
      method: 'post',
      url: 'eventStaff/registerStaff',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${getAuthToken()}`,
      },
      data: JSON.stringify(data),
    });
    return respone;
  } catch (e) {
    return e;
  }
};

export const AddStaffByEmail = async (email, eventId) => {
  try {
    const respone = await request({
      method: 'post',
      url: `eventStaff/addStaffByEmail?email=${email}&eventId=${eventId}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${getAuthToken()}`,
      },
    });
    return respone;
  } catch (e) {
    return e;
  }
};

export const GetUpcomingEventsByOrganizerService = async(organizerId) => {
  try {
    const respone = await request({
      method: 'get',
      url: `eventStaff/getUpcomingEventByOrganizer?organizerId=${organizerId}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${getAuthToken()}`,
      },
    });
    return respone;
  } catch (e) {
    return e;
  }
}

export const GetStaffByEventService = async(eventId) => {
  try {
    const respone = await request({
      method: 'get',
      url: `eventStaff/getStaffByEvent?eventId=${eventId}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${getAuthToken()}`,
      },
    });
    return respone;
  } catch (e) {
    return e;
  }
}

export const DeleteStaffService = async(staffId , eventId) => {
  try {
    const respone = await request({
      method: 'delete',
      url: `eventStaff/deleteStaff?staffId=${staffId}&eventId=${eventId}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${getAuthToken()}`,
      },
    });
    return respone;
  } catch (e) {
    return e;
  }
}