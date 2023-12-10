import axios from "axios";
export const BASE_API = process.env.REACT_APP_API_BASE;
export const EVENTS_URL = `${BASE_API}/api/events`;

export const findEvent = async (eventId) => {
  const response = await axios
    .get(`${EVENTS_URL}/${eventId}`);
  return response.data;
};

export const createEvent = async (event) => {
  const response = await axios.post(`${EVENTS_URL}`, event);
  return response.data;
};

export const deleteEvent = async (eventId) => {
  const response = await axios
    .delete(`${EVENTS_URL}/${eventId}`);
  return response.data;
};

export const updateEvent = async (eventId, event) => {
  const response = await axios.
    put(`${EVENTS_URL}/edit/${eventId}`, event);
  return response.data;
};

export const findAllEvents = async () => {
  const response = await axios.get(EVENTS_URL);
  return response.data;
};
export const API_KEY = process.env.REACT_APP_GOOGLE_SEARCH_API_KEY;

export const registerUserForEvent = async (eventId, eventTitle, userEmail) => {
  const response = await axios.post(`${EVENTS_URL}/${eventId}/register`, { userEmail: userEmail , eventTitle: eventTitle});
  return response.data;
};

export const unregisterUserFromEvent = async (eventId, userEmail) => {
  const response = await axios.post(`${EVENTS_URL}/${eventId}/unregister`, { userEmail });
  return response.data;
};

export const addCommentToEvent = async (eventId, userEmail, commentText) => {
  const response = await axios.post(`${EVENTS_URL}/${eventId}/comments`, {
    userEmail: userEmail,
    content: commentText
  });
  return response.data;
}