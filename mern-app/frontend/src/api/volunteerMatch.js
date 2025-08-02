import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const getMatch = async (eventId) => {

    try {
        const response = await axios.get(`${API_BASE}/volmatch/${eventId}`);
        return response.data;

    }   catch (error) {
        console.error("Failed to fetch volunteer matches:", error);
        throw error;
    }
};