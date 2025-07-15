// controllers/volunteerMatchingController.js
import { matchVolunteers } from "../utils/matchVolunteers.js";
import { mockCompleteProfiles } from "../mocks/mockCompleteProfiles.js";
import { mockEvents } from "../mocks/mockEvents.js";

export const getMatches = async (req, res) => {
  const { eventId } = req.params;
  console.log("GET /api/volmatch/:eventId");
  console.log("eventId: ", eventId);
  const event = mockEvents.find(e => e._id === eventId);
  if (!event) {
    console.log("Event not found!")
    return res.status(404).json({ error: "Event not found" });
  }

  const matches = matchVolunteers(mockCompleteProfiles, event);
  console.log("Matches found!");
  res.json(matches);
};
