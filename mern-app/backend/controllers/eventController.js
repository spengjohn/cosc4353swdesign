import EventDetails from "../models/Event.js";

export const createEvent = async (req, res) => {
  try {
    const newEvent = new EventDetails(req.body);
    const savedEvent = await newEvent.save();
    res.status(201).json({ message: "Event created", event: savedEvent });
  } catch (err) {
    console.error("createEvent error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    //console.log("GET /api/events/:eventId");
    const event = await EventDetails.findById(eventId).populate("assignedVolunteers");

    if (!event) return res.status(404).json({ message: "Event not found" });

    res.json(event);
  } catch (err) {
    console.error("getEvent error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getCurrentEvents = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const events = await EventDetails.find({ date: { $gte: today } });

    res.json(events);
  } catch (error) {
    console.error("fetchCurrentEvents error: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const updateEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const updateData = req.body;
    // Notification pseudocode:
    // 1. findById for EventDetails
    // Compare current details to update details:
    // 4 scenarios:
    // a) The list of assigned volunteers has changed because:
      // a.1) Someone was added
      // a.2) Someone was removed
      // Possible for both to happen.
    // b) Event Details like description, location, city, skills, etc. changed.
      // Can make a generic announcement that the event changed
      // Just need to send to EVERYONE who is currently assigned
    // c) The Event was deleted
    // Similar to b) just say the event was deleted.
    // d) There are no actual changes. no need for any notification to be made.
    // Finally we can update the event and return response.
    const updated = await EventDetails.findByIdAndUpdate(eventId, updateData, { new: true });

    if (!updated) return res.status(404).json({ message: "Event not found" });

    res.json({ message: "Event updated successfully", event: updated });
  } catch (err) {
    console.error("updateEvent error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const deleted = await EventDetails.findByIdAndDelete(eventId);

    if (!deleted) return res.status(404).json({ message: "Event not found" });

    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error("deleteEvent error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};