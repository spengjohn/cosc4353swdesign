// controllers/volunteerMatchingController.js
import { matchVolunteers } from "../utils/matchVolunteers.js";
import { mockMatchProfiles } from "../mocks/mockMatchProfiles.js";
import { mockMatchEvents } from "../mocks/mockMatchEvents.js";

export const getMatches = async (req, res) => {
  const { eventId } = req.params;
  console.log("GET /api/volmatch/:eventId");
  console.log("eventId: ", eventId);
  const event = mockMatchEvents[parseInt(eventId)];
  if (!event) {
    console.log("Event not found!")
    return res.status(404).json({ error: "Event not found" });
  }

  const matches = matchVolunteers(mockMatchProfiles, event);
  console.log("Matches found!", matches.map(m => m.fullName));
  res.json(matches);
};
