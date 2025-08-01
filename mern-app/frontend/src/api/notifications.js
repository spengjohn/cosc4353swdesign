import axios from "axios";

export const fetchNotifications = async (recipient) => {
    try{
        const response = await axios.get(`/api/notifications/${recipient}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch user notifications: ", error);
        throw error;
    }
};

export const updateAllNotifications = async (accountId) => {
    try{
        const response = await axios.patch(`/api/notifications/update/all/${accountId}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch user notifications: ", error);
        throw error;
    }
};

export const deleteAllNotifications = async (accountId) => {
    try{
        const response = await axios.delete(`/api/notifications/delete/all/${accountId}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch user notifications: ", error);
        throw error;
    }
};