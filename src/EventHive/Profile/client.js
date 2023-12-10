import axios from "axios";
export const BASE_API = process.env.REACT_APP_API_BASE;
export const PROFILE_URL = `${BASE_API}/api/profile`;


export const updateProfile = async (profile) => {
    const response = await axios
      .put(`${PROFILE_URL}/${profile.email}`, profile);
    return response.data;
  };
export const findProfileByEmail = async (email) => {
  try{
    const response = await axios.get(`${PROFILE_URL}/${email}`);
    return response.data;

  }catch(error){
    console.error("Error:",error.message);
  }
};

export const follow = async (profilePair) => {
  try{
    const response = await axios.put(`${PROFILE_URL}/${profilePair.followingEmail}/follow`, profilePair);
    return response.data;
  }catch(error){
    console.error("Error:",error.message);
  }
  
};

export const unfollow = async (profilePair) => {
  try{
    const response = await axios.put(`${PROFILE_URL}/${profilePair.followingEmail}/unfollow`, profilePair);
    return response.data;
  }catch(error){
    console.error("Error:",error.message);
  }
  
};