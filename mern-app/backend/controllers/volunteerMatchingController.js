import EventDetails from "../models/Event.js";
import UserProfile from "../models/UserProfile.js";

export const getMatches = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await EventDetails.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const allProfiles = await UserProfile.find();

    const isSameUTCDate = (d1, d2) =>
      d1.getUTCFullYear() === d2.getUTCFullYear() &&
      d1.getUTCMonth() === d2.getUTCMonth() &&
      d1.getUTCDate() === d2.getUTCDate();

    const matches = allProfiles
      .filter(profile => {
        const isAvailable = profile.availableDates.some(date =>
          isSameUTCDate(new Date(date), new Date(event.date))
        );
        const hasSkills = event.skillsRequired.every(skill =>
          profile.skills.includes(skill)
        );
        const sameState = profile.state === event.state;
        return isAvailable && hasSkills && sameState;
      })
      .sort((a, b) => {
        const aCityMatch = a.city === event.city ? 1 : 0;
        const bCityMatch = b.city === event.city ? 1 : 0;
        return bCityMatch - aCityMatch;
      });

    res.json(matches);
  } catch (err) {
    console.error("getMatches error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

