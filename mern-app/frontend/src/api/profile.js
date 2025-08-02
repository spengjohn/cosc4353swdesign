import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const fetchUserHistory = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE}/profile/history/${userId}`)
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user history: ", error);
  }
};

export const fetchUserProfile = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE}/profile/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    throw error;
  }
};

export const updateUserProfile = async (userId, profileData) => {
  try {
    const response = await axios.post(`${API_BASE}/profile/${userId}`, profileData);
    return response.data;
  } catch (error) {
    console.error("Failed to update user profile:", error);
    throw error;
  }
};