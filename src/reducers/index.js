import { combineReducers } from 'redux';
import auth from './auth';
// import CourseReducer from '../components/courses/CourseReducer';
import EventsReducer from '../components/Events/EventsReducer';

export default combineReducers({
	auth,
	EventsReducer,
});
