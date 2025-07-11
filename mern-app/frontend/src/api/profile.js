import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const fetchUserProfile = async (userId) => {
    
    try {
        const response = await axios.get(`${API_BASE_URL}/api/profile/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch user profile:", error);
        throw error;
    }
};

export const updateUserProfile = async (userId, profileData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/profile/${userId}`, profileData);
    return response.data;
  } catch (error) {
    console.error("Failed to update user profile:", error);
    throw error;
  }
};