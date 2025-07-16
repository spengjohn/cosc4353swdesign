import { mockEvents } from "../mocks/mockEvents.js";

export const getEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    console.log("GET /api/event/:aeventId");
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
    console.log("GET /api/event/:eventId");
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