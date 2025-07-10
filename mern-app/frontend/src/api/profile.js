import axios from 'axios';

export const fetchUserProfile = async (userId) => {
    const res = await axios.get(`/api/profile/${userId}`);
    return res.data;
    /*
    try {
        const response = await axios.get(`/api/profile/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch user profile:", error);
        throw error;
    }*/
};

export const updateUserProfile = async (userId, profileData) => {
  try {
    const response = await axios.post(`/api/profile/${userId}`, profileData);
    return response.data;
  } catch (error) {
    console.error("Failed to update user profile:", error);
    throw error;
  }
};