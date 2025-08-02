import axios from 'axios';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`/api/auth/login`, { email, password });
    return { status: response.status, data: response.data };
  } catch (error) {
    return { status: error.response?.status || 500, data: error.response?.data || {} };
  }
};

export const registerUser = async (email, password, role) => {
  try {
    const response = await axios.post(`/api/auth/register`, { email, password, role });
    return { status: response.status, data: response.data };
  } catch (error) {
    return { status: error.response?.status || 500, data: error.response?.data || {} };
  }
};

export const updateCredentials = async (userId, isVerified, isProfileComplete) => {
  try {
    const response = await axios.post(`/api/auth/update`, {userId, isVerified, isProfileComplete});
    return {status: response.status, data: response.data };
  } catch (error) {
    return { status: error.response?.status || 500, data: error.response?.data || {}};
  }
};