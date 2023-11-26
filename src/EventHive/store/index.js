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
