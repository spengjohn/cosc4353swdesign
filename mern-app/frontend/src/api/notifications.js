import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const fetchNotifications = async (recipient) => {
    try{
        const response = await axios.get(`${API_BASE}/notifications/${recipient}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch user notifications: ", error);
        throw error;
    }
};

export const updateAllNotifications = async (accountId) => {
    try{
        const response = await axios.patch(`${API_BASE}/notifications/update/all/${accountId}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch user notifications: ", error);
        throw error;
    }
};

export const deleteAllNotifications = async (accountId) => {
    try{
        const response = await axios.delete(`${API_BASE}/notifications/delete/all/${accountId}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch user notifications: ", error);
        throw error;
    }
};