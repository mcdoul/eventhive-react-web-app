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

export const updateEvent = async (event) => {
  const response = await axios.
    put(`${EVENTS_URL}/${event._id}`, event);
  return response.data;
};

export const findAllEvents = async () => {
  const response = await axios.get(EVENTS_URL);
  return response.data;
};

export const API_KEY = process.env.REACT_APP_GOOGLE_SEARCH_API_KEY;