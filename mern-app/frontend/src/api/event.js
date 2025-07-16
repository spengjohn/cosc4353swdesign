import axios from 'axios';

export const fetchEvent = async (eventId) => {
    
    try {
        const response = await axios.get(`/api/events/${eventId}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch event :", error);
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

export const getAttendees = async (eventId) => {
    try {
        const response = await axios.get(`/api/events/attendees/${eventId}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch list of assigned volunteers: ", error);
    }
}