import { mockEvents } from "../mocks/mockEvents.js";

export const getEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    console.log("GET /api/events/:eventId");
    console.log("eventId:", eventId);

    const event =
      Object.values(mockEvents).find((e) => String(e.eventId) === String(eventId)) || {
        eventId,
        title: "",
        description: "",
        location: "",
        city: "",
        state: "",
        date: new Date(0),
        urgency: "",
        skillsRequired: [],
        assignedVolunteers: []
      };

    console.log("Returning event:", event);
    res.json(event);
  } catch (err) {
    console.error("getEvent error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getCurrentEvents = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to midnight

    const upcomingEvents = Object.values(mockEvents).filter(event => {
      // Ensure event.date exists, is not an empty string, and parses to a valid date
      if (!event.date || event.date.trim() === "") return false;

      const eventDate = new Date(event.date);
      if (isNaN(eventDate)) return false;

      return eventDate >= today;
    });
    res.json(upcomingEvents);
  }  catch (error) {
    console.error("fetchCurrentEvents error: ", error);
    res.status(500).json({error: "Internal server error"});
  }
};

export const updateEvent = async (req, res) => {
  const { eventId } = req.params;
  const updatedEvent = req.body;

  console.log("Mock update for event ID:", eventId);
  console.log("Data received:", updatedEvent);

  // Just echo back the updated profile for now (mock)
  res.json({ message: "Mock event updated", event: updatedEvent });
};


export const getAttendees = async (req, res) => {
  try {
    const { eventId } = req.params;
    console.log("GET /api/events/:eventId");
    console.log("eventId:", eventId);

const attendees =
  (Object.values(mockEvents).find((e) => e.eventId === eventId) || { assignedVolunteers: "" }).assignedVolunteers;


    console.log("Returning all assigned attendees:", attendees);
    res.json(attendees);
  } catch (err) {
    console.error("getAttendees error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};