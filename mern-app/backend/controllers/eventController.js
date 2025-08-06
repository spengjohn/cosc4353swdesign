import EventDetails from "../models/Event.js";
import { createNotification } from "./notificationsController.js";
import UserCredentials from "../models/UserCredentials.js"; // added due to potential populate errors otherwise

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
  console.log("Fetching event with ID:", eventId);
    const event = await EventDetails.findById(eventId).populate("assignedVolunteers");

    if (!event) {
      console.log("Event not found");
      return res.status(404).json({ message: "Event not found" })
    };

    console.log("Event found:", event);
    res.status(200).json(event);
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

export const getMyNextEvents = async (req, res) => {
  try {
    const { accountId } = req.params;
    const today = new Date();
    today.setHours(0,0,0,0);

    const events = await EventDetails.find({
      date: { $gte: today },
      assignedVolunteers: accountId, // this goes **outside** the date object
    })
    .sort({ date: 1 })
    .limit(3);
    if (!events || events.length === 0) {
      return res.status(404).json({ message: "No events found" });
    } res.status(200).json(events);
  } catch (error) {
    console.error("fetchMyNextEvents error: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const updateEvent = async (req, res) => {
  try {
        console.log('Incoming request body:', req.body);
    const { eventId } = req.params;
    const updateData = req.body;
    // Notification pseudocode:
    // 1. findById for EventDetails
    const currentEvent = await EventDetails.findById(eventId);
    if (!currentEvent) return res.status(404).json({ message: "Event not found" });

    //const updated = await EventDetails.findByIdAndUpdate(eventId, updateData, { new: true });
    //if (!updated) return res.status(404).json({ message: "Event not found" });

    const notificationsToSend = [];
    // Compare current details to update details:
    // 4 scenarios:
    // a) The list of assigned volunteers has changed because:
      // a.1) Someone was added
      // a.2) Someone was removed
      // Possible for both to happen.
    if (updateData.assignedVolunteers || 
      (currentEvent.assignedVolunteers && updateData.assignedVolunteers)) {
      const currentVolunteers = (currentEvent.assignedVolunteers || []).map(v => v.toString());
      const newVolunteers = updateData.assignedVolunteers || [];
      console.log("currentVolunteers:", currentVolunteers);
      console.log("newVolunteers:", newVolunteers);

      // a.1) Someone was added
      const addedVolunteers = newVolunteers.filter(
        volunteer => !currentVolunteers.includes(volunteer)
      );
      for (const volunteer of addedVolunteers) {
        notificationsToSend.push(
          createNotification(
            volunteer,
            "Event Assignment",
            `You've been assigned to event: ${updateData.title}`
          )
        );
      }

      // a.2) Someone was removed
      const removedVolunteers = currentVolunteers.filter(
        volunteer => !newVolunteers.includes(volunteer)
      );
      for (const volunteer of removedVolunteers) {
        notificationsToSend.push(
          createNotification(
            volunteer,
            "Event Assignment",
            `You've been unassigned from event: ${currentEvent.title}`
          )
        );
      }
    }

    // b) Event Details like description, location, city, skills, etc. changed.
      // Can make a generic announcement that the event changed
      // Just need to send to EVERYONE who is currently assigned
    const detailFields = ['title', 'description', 'location', 'city', 'skillsRequired', 'date', 'maxVolunteers', 'urgency'];
    const detailsChanged = detailFields.some(
      field => JSON.stringify(currentEvent[field]) !== JSON.stringify(updateData[field])
    );

    if (detailsChanged && updateData.assignedVolunteers?.length > 0) {
      for (const volunteer of updateData.assignedVolunteers) {
        console.log("Send notification to volunteer: ", volunteer)
        notificationsToSend.push(
          createNotification(
            volunteer,
            "Update",
            `Event details have changed for: ${updateData.title}`
          )
        );
      }
    }
    // c) The Event was deleted
    // Similar to b) just say the event was deleted. handles this in the function below
    // d) There are no actual changes. no need for any notification to be made.
    // Finally we can update the event and return response.
    const updated = await EventDetails.findByIdAndUpdate(eventId, updateData, { new: true });
    if (!updated) return res.status(404).json({ message: "Event not found" });
    await Promise.all(notificationsToSend);
    console.log(updated);
    res.json({ message: "Event updated successfully", event: updated });
    
  } catch (err) {
    console.error("updateEvent error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    // Find the event before deleting to get assigned volunteers
    const eventToDelete = await EventDetails.findById(eventId);
    console.log("Fetched event to delete:", eventToDelete);
    if (!eventToDelete) {
      
  console.log('Event to delete not found');
  return res.status(404).json({ message: "Event not found" })};

    // Scenario c: Event was deleted - notify all assigned volunteers
    const notificationsToSend = [];
    if (eventToDelete.assignedVolunteers?.length > 0) {
      for (const volunteer of eventToDelete.assignedVolunteers) {
        notificationsToSend.push(
          createNotification(
            volunteer,
            "Update",
            `Event has been cancelled: ${eventToDelete.title}`
          )
        );
      }
    }

    // Delete the event
    const deleted = await EventDetails.findByIdAndDelete(eventId);
  console.log('Event deleted:', deleted);
    if (!deleted) return res.status(404).json({ message: "Event not found" });

    // Send all notifications
    await Promise.all(notificationsToSend);

    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error("deleteEvent error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};