// import { createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from 'redux-thunk';
// import rootReducer from '../../reducers';

// const initialState = {};
// const middleware = [thunk];

// const store = createStore(
// 	rootReducer,
// 	initialState,
// 	composeWithDevTools(applyMiddleware(...middleware))
// );

// export default store;

import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from '../../reducers';

const initialState = {};

const store = configureStore({
	reducer: rootReducer,
	preloadedState: initialState,
	middleware: [thunk],
});

export default store;
