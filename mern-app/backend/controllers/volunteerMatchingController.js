import { mockEvents } from "../mocks/mockEvents";
import { mockProfiles } from "../mocks/mockProfiles";
import {matchVolunteers} from "../utils/matchVolunteers.js"
export const getMatches = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = mockEvents[eventId];

    if (!event || !event.title) {
      return res.status(404).json({ message: "Event not found" });
    }

    const matches = matchVolunteers(Object.values(mockProfiles), event);
    res.json(matches); // Array of matches
  } catch (err) {
    console.error("getMatches error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
