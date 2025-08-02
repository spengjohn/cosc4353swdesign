import axios from 'axios';

export const fetchUserHistory = async (userId) => {
  try {
    const response = await axios.get(`/api/profile/history/${userId}`)
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user history: ", error);
  }
};

export const fetchUserProfile = async (userId) => {
  try {
    const response = await axios.get(`/api/profile/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    throw error;
  }
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