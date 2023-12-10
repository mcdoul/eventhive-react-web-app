import axios from 'axios';
export const BASE_API = process.env.REACT_APP_API_BASE;
export const BASE_URL = `${BASE_API}/api/`;

const instance = axios.create({
	baseURL: BASE_URL,
});

export default instance;
