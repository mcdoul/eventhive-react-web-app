import axios from '../config/axiosConfig';

import { showAlert } from '../utils/alertHelper';

export const loadUser = () => async (dispatch) => {

	if (localStorage.apiKey) {
		axios.defaults.headers.common['x-api-key'] = localStorage.apiKey;
	} else {
		delete axios.defaults.headers.common['x-api-key'];
	}

	try {
		const res = await axios.get('/users/load');

		dispatch({ type: 'USER_LOADED', payload: res.data });
	} catch (err) {
		dispatch({ type: 'NotAuthenticated' });
	}
};

export const register =
	({ name, email, password }) =>
	async (dispatch) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const body = JSON.stringify({ name, email, password });

		try {
			const res = await axios.post('/users/register', body, config);

			dispatch({
				type: 'Authenticated',
				payload: res.data,
			});
			dispatch(loadUser());
			showAlert('success', 'Success!', 'SignUp Successfully');
		} catch (err) {
			const errors = err.response.data.errors;

			if (errors) {
				showAlert(
					'error',
					'Oops...',
					errors.map((error) => error.msg).join('<br/>')
				);
			}

			dispatch({
				type: 'NotAuthenticated',
			});
		}
	};

// Login user
export const login = (email, password, isAdministrator) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const body = JSON.stringify({ email, password, isAdministrator });

	try {
		const res = await axios.post('/users/login', body, config);
		dispatch({
			type: 'Authenticated',
			payload: res.data,
		});

		dispatch(loadUser());

		showAlert('success', 'Success!', 'Login Successfully');
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			showAlert(
				'error',
				'Oops...',
				errors.map((error) => error.msg).join('<br/>')
			);
		}
		dispatch({
			type: 'NotAuthenticated',
		});
	}
};

export const logout = () => (dispatch) => {
	dispatch({ type: 'NotAuthenticated' });
	showAlert('success', 'Success!', 'Logout Successfully');
};
