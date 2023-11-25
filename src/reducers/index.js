import { combineReducers } from 'redux';
import auth from './auth';
import CourseReducer from '../components/courses/CourseReducer';

export default combineReducers({
	auth,
	CourseReducer,
});
