import axios from "axios";

export const fetchNotifications = async (recipient) => {
    try{
        const response = await axios.get(`/api/notifications/${recipient}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch user notifications: ", error);
        throw error;
    }
}
/*
export const makeNotification = async (recipientId, notif) => {
    try {
        const response = await axios.post()
    }
}*/