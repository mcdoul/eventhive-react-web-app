import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
const PROFILE_URL = "http://localhost:4000/api/profile";

// export const deleteModule = async (moduleId) => {
//     const response = await axios
//       .delete(`${MODULES_URL}/${moduleId}`);
//     return response.data;
//   };
export const updateProfile = async (profile) => {
    const response = await axios
      .put(`${PROFILE_URL}/${profile.email}`, profile);
    return response.data;
  };
export const findProfileByEmail = async(email) => {
  try{
    const response = await axios.get(`${PROFILE_URL}/${email}`);
    return response.data;
  }catch(error){
    console.error("Error:",error.message);
  }
    
};