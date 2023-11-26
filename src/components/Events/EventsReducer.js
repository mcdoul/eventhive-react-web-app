import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
  event: {
    name: "",
    location: "", 
    startDate: "", 
    endDate: "",   
    organizer_id: "",
    attendance_id: [],
    price: "",
    description: "",
    comments: [],
    registered: []
  },
};


const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload;
    },

    addEvent: (state, action) => {
      state.events = [action.payload, ...state.events];
    },

    deleteEvent: (state, action) => {
      state.events = state.events.filter(
        (event) => event._id !== action.payload
      );
    },

    updateEvent: (state, action) => {
      state.events = state.events.map((event) => {
        if (event._id === action.payload._id) {
          return action.payload;
        } else {
          return event;
        }
      });
    },

    setEvent: (state, action) => {
      state.event = { ...action.payload };
    },
  },
});


export const { addEvent, deleteEvent, updateEvent, setEvent, setEvents } = eventsSlice.actions;
export default eventsSlice.reducer;
