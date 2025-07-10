import axios from 'axios';

export const fetchUserProfile = async (userId) => {
    const res = await axios.get(`/api/user/${userId}`);
    return res.data;
    /*
  try {
    const response = await axios.get(`/api/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    throw error;
  }*/
};

export const updateUserProfile = async (userId, profileData) => {
  try {
    const response = await axios.put(`/api/users/${userId}`, profileData);
    return response.data;
  } catch (error) {
    console.error("Failed to update user profile:", error);
    throw error;
  }
};
