import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from 'redux-thunk'; // Import redux-thunk middleware
import EventsReducer from "../../components/Events/EventsReducer";

const store = configureStore({
  reducer: {
    EventsReducer
  },
}, applyMiddleware(thunk));

export default store;