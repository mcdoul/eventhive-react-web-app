import { combineReducers } from 'redux';
import auth from './auth';
import EventsReducer from '../components/Events/EventsReducer';
import ProfileReducer from '../EventHive/Profile/ProfileReducer';

export default combineReducers({
	auth,
	EventsReducer,
	ProfileReducer,
});