import { combineReducers } from 'redux';
import auth from './auth';
import EventsReducer from '../components/Events/EventsReducer';

export default combineReducers({
	auth,
	EventsReducer,
});
