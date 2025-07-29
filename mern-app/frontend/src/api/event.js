import axios from 'axios';

export const createEvent = async (eventData) => {
  try {
    const response = await axios.post(`/api/events/create`, eventData);
    return response.data;
  } catch (error) {
    console.error("Failed to create event", error);
    throw error;
  }
};

export const fetchEvent = async (eventId) => {
    
    try {
        const response = await axios.get(`/api/events/${eventId}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch event :", error);
        throw error;
    }
};

export const fetchCurrentEvents = async () => {
  try {
    const response = await axios.get(`/api/events/current`);
    return response.data;
  } catch (error) {
    console.error("failed to fetch current events: ", error);
    throw error;
  }
};

export const updateEvent = async (eventId, eventData) => {
  try {
    const response = await axios.post(`/api/events/${eventId}`, eventData);
    return response.data;
  } catch (error) {
    console.error("Failed to update event :", error);
    throw error;
  }
};

export const deleteEvent = async (eventId) => {
    try {
        const response = await axios.post(`/api/events/delete/${eventId}`);
        return response.data;
    } catch (error) {
        console.error("Failed to delete event: ", error);
    }
}