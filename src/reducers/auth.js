const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	// loading: true,
	user: null,
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	if (type === 'USER_LOADED') {
		return {
			...state,
			isAuthenticated: true,
			// loading: false,
			user: payload,
		};
	} else if (type === 'Authenticated') {
		localStorage.setItem('token', payload.token);
		return {
			...state,
			...payload,
			isAuthenticated: true,
			// loading: false,
		};
	} else if (type === 'NotAuthenticated') {
		localStorage.removeItem('token');
		return {
			...state,
			token: null,
			isAuthenticated: false,
			// loading: false,
		};
	} else {
		return state;
	}
}
