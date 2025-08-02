import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const getHistory = async (accountId) => {

    try {
        const response = await axios.get(`${API_BASE}/history/${accountId}`);
        return response.data;
        
    }   catch (error) {
        console.error("Failed to fetch volunteer history:", error);
        throw error;
    }
};