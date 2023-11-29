import axios from "axios";
const EVENTS_URL = "http://localhost:4000/api/events";

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

export const registerUserForEvent = async (eventId, userEmail) => {
  const response = await axios.post(`${EVENTS_URL}/${eventId}/register`, { userEmail: userEmail });
  return response.data;
};

export const addCommentToEvent = async (eventId, userEmail, commentText) => {
  const response = await axios.post(`${EVENTS_URL}/${eventId}/comments`, {
    userEmail: userEmail,
    content: commentText
  });
  return response.data;
}