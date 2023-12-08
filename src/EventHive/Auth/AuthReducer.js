import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  apiKey: localStorage.getItem('apiKey'),
  isAuthenticated: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoaded: (state, action) => {
        console.log("enter userLoaded reducer!!!!!")
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    },
    userAuthenticated: (state, action) => {
      localStorage.setItem('apiKey', action.payload.apiKey);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
    },
    userNotAuthenticated: (state) => {
      localStorage.removeItem('apiKey');
      return {
        ...state,
        apiKey: null,
        isAuthenticated: false,
      };
    },
  },
});

export const { userLoaded, userAuthenticated, userNotAuthenticated } = authSlice.actions;
export default authSlice.reducer;

