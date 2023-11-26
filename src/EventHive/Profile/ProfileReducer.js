import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    
    profile : {
        name: "",
        email: "",
        phone: "",
        address1: "",
        address2: "",
    },
  };

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers:{
        updateProfile: (state, action) => {
            state.profile = action.payload;
        },
        setProfile: (state, action) => {
            state.profile = {...action.payload};
        },
    }
})
export const { updateProfile, setProfile } = profileSlice.actions;
export default profileSlice.reducer;