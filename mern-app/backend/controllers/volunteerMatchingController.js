// controllers/volunteerMatchingController.js
import { matchVolunteers } from "../utils/matchVolunteers.js";
import { mockCompleteProfiles } from "../mocks/mockCompleteProfiles.js";
import { mockEvents } from "../mocks/mockEvents.js";

export const getMatches = async (req, res) => {
  const { eventId } = req.params;

  const event = mockEvents.find(e => e._id === eventId);
  if (!event) {
    return res.status(404).json({ error: "Event not found" });
  }

  const matches = matchVolunteers(mockCompleteProfiles, event);
  res.json(matches);
};
