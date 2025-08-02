import axios from 'axios';

export const getHistory = async (accountId) => {

    try {
        const response = await axios.get(`/api/history/${accountId}`);
        return response.data;
        
    }   catch (error) {
        console.error("Failed to fetch volunteer history:", error);
        throw error;
    }
};