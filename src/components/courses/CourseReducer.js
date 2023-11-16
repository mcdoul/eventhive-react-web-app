import { createSlice } from "@reduxjs/toolkit";
import db from "../../Database";

const initialState = {
  courses: db.courses,
  course: {
    _id: "",
    name: "",
    number: "",
    startDate: "",
    endDate: "",
  },
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, action) => { 
      const newCourse = { ...action.payload };
      state.courses.push(newCourse);
      state.course = {
        _id: "",
        name: "",
        number: "",
        startDate: "",
        endDate: "",
      };
    },
    deleteCourse: (state, action) => {
      state.courses = state.courses.filter((course) => course._id !== action.payload);
    },
    updateCourse: (state, action) => {
      const index = state.courses.findIndex((course) => course._id === action.payload._id);
      if (index !== -1) {
        state.courses[index] = action.payload;
        state.course = {
          _id: "",
          name: "",
          number: "",
          startDate: "",
          endDate: "",
        };
      }
    },
    setCourse: (state, action) => {
      state.course = { ...action.payload };
    },
  },
});
export const { addCourse, deleteCourse, updateCourse, setCourse } = coursesSlice.actions;
export default coursesSlice.reducer;