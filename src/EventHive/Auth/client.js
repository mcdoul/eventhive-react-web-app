import axios from '../../config/axiosConfig';
import { showAlert } from '../../utils/alertHelper';
import { userLoaded, userAuthenticated, userNotAuthenticated } from './AuthReducer';

const generateConfig = () => ({
	headers: {
	  'Content-Type': 'application/json',
	},
  });

  const handleErrorResponse = (err) => {
	const errors = err.response.data.errors;
  
	if (errors) {
	  showAlert('error', 'Oops...', errors.map((error) => error.msg).join('\n'));
	}
  };

export const loadUser = () => async (dispatch) => {

	if (localStorage.apiKey) {
		axios.defaults.headers.common['x-api-key'] = localStorage.apiKey;
	} else {
		delete axios.defaults.headers.common['x-api-key'];
	}

	try {
		const res = await axios.get('/users/load');

		dispatch(userLoaded(res.data));

	} catch (err) {
		dispatch(userNotAuthenticated());
	}
};

export const register =
	({ name, email, password }) =>
	async (dispatch) => {

		const body = JSON.stringify({ name, email, password });

		try {
			const res = await axios.post('/users/register', body, generateConfig());

			dispatch(userAuthenticated(res.data));
			dispatch(loadUser());


			showAlert('success', 'Success!', 'SignUp Successfully');
		} catch (err) {
			handleErrorResponse(err);
			dispatch(userNotAuthenticated());
		}
	};

export const login = (email, password, isAdministrator) => async (dispatch) => {

	const body = JSON.stringify({ email, password, isAdministrator });

	try {
		const res = await axios.post('/users/login', body, generateConfig());

		dispatch(userAuthenticated(res.data));
		dispatch(loadUser());

		showAlert('success', 'Success!', 'Login Successfully');
	} catch (err) {
		handleErrorResponse(err);
		dispatch(userNotAuthenticated());
	}
};

export const logout = () => (dispatch) => {
	dispatch(userNotAuthenticated());
	showAlert('success', 'Success!', 'Logout Successfully');
};

export const resetPassword = async (email, validationCode, password, navigate) => {

	const body = JSON.stringify({email, validationCode, password});

	try {
		const res = await axios.post('/users/reset-password', body, generateConfig());

		showAlert('success', 'Success!', 'Reset Successfully, Jump into Login Page');
		navigate('/EventHive/login');

	} catch (err) {
		handleErrorResponse(err);
	}
}

export const sendValidationCode = async (email) => {

	const body = JSON.stringify({email});

	try {
		const res = await axios.post('/users/forgot-password', body, generateConfig());

		showAlert('success', 'Success!', `Validation code sent to ${email}`);
	} catch (err) {
		handleErrorResponse(err);
	}
}
