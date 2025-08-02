import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const createEvent = async (eventData) => {
  try {
    const response = await axios.post(`${API_BASE}/events/create`, eventData);
    return response.data;
  } catch (error) {
    console.error("Failed to create event", error);
    throw error;
  }
};

export const fetchEvent = async (eventId) => {
    
    try {
        const response = await axios.get(`${API_BASE}/events/${eventId}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch event :", error);
        throw error;
    }
};

export const fetchCurrentEvents = async () => {
  try {
    const response = await axios.get(`${API_BASE}/events/current`);
    return response.data;
  } catch (error) {
    console.error("failed to fetch current events: ", error);
    throw error;
  }
};

export const fetchMyNextEvents = async (accountId) => {
  try {
    const response = await axios.get(`${API_BASE}/events/mycurrent/${accountId}`);
    return response.data;
  } catch (error) {
    console.error("failed to fetch user's next events: ", error);
    throw error;
  }
};

export const updateEvent = async (eventId, eventData) => {
  try {
    const response = await axios.post(`${API_BASE}/events/${eventId}`, eventData);
    return response.data;
  } catch (error) {
    console.error("Failed to update event :", error);
    throw error;
  }
};

export const deleteEvent = async (eventId) => {
    try {
        const response = await axios.post(`${API_BASE}/events/delete/${eventId}`);
        return response.data;
    } catch (error) {
        console.error("Failed to delete event: ", error);
    }
}