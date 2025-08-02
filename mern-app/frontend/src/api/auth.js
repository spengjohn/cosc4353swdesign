import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE}/auth/login`, { email, password });
    return { status: response.status, data: response.data };
  } catch (error) {
    return { status: error.response?.status || 500, data: error.response?.data || {} };
  }
};

export const registerUser = async (email, password, role) => {
  try {
    const response = await axios.post(`${API_BASE}/auth/register`, { email, password, role });
    return { status: response.status, data: response.data };
  } catch (error) {
    return { status: error.response?.status || 500, data: error.response?.data || {} };
  }
};

export const updateCredentials = async (userId, isVerified, isProfileComplete) => {
  try {
    const response = await axios.post(`${API_BASE}/auth/update`, {userId, isVerified, isProfileComplete});
    return {status: response.status, data: response.data };
  } catch (error) {
    return { status: error.response?.status || 500, data: error.response?.data || {}};
  }
};