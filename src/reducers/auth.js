const initialState = {
	apiKey: localStorage.getItem('apiKey'),
	isAuthenticated: null,
	user: null,
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	if (type === 'USER_LOADED') {
		return {
			...state,
			isAuthenticated: true,
			user: payload,
		};
	} else if (type === 'Authenticated') {
		localStorage.setItem('apiKey', payload.apiKey);
		return {
			...state,
			...payload,
			isAuthenticated: true,
		};
	} else if (type === 'NotAuthenticated') {
		localStorage.removeItem('apiKey');
		return {
			...state,
			apiKey: null,
			isAuthenticated: false,
		};
	} else {
		return state;
	}
}
