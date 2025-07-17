import axios from 'axios';

// your backend endpoint
const API_URL = `http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/auth`;

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return { status: response.status, data: response.data };
  } catch (error) {
    return { status: error.response?.status || 500, data: error.response?.data || {} };
  }
};

export const registerUser = async (email, password, role) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { email, password, role });
    return { status: response.status, data: response.data };
  } catch (error) {
    return { status: error.response?.status || 500, data: error.response?.data || {} };
  }
};
