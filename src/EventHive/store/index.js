import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from 'redux-thunk'; // Import redux-thunk middleware
import CourseReducer from "../../components/courses/CourseReducer";

const store = configureStore({
  reducer: {
    CourseReducer
  },
}, applyMiddleware(thunk));

export default store;