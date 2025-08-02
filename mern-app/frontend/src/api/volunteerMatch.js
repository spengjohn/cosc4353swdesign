import axios from 'axios';

export const getMatch = async (eventId) => {

    try {
        const response = await axios.get(`/api/volmatch/${eventId}`);
        return response.data;

    }   catch (error) {
        console.error("Failed to fetch volunteer matches:", error);
        throw error;
    }
};