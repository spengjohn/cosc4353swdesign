import UserProfile from '../models/UserProfile.js';
import UserCredentials from '../models/UserCredentials.js';
import EventDetails from '../models/Event.js';
// GET profile by credentialId
export const getProfile = async (req, res) => {
  try {
    const { accountId } = req.params;
    
    const profile = await UserProfile.findOne({ credentialId: accountId });

    if (!profile) {
      return res.status(200).json(null); // null if no profile yet
    }

    res.status(200).json(profile);
  } catch (err) {
    console.error("getProfile error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { accountId } = req.params;
    const updatedProfile = req.body;

    const user = await UserCredentials.findById(accountId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const existingProfile = await UserProfile.findOne({ credentialId: accountId });

    // Defensive Check: Block update if assigned to events and changes break compatibility
    const today = new Date();
today.setHours(0, 0, 0, 0); // Normalize to start of day

const conflictingEvents = await EventDetails.find({
  assignedVolunteers: accountId,
  date: { $gte: today }, // Only future or today’s events
});

    const hasConflict = conflictingEvents.some((event) => {
  //const cityMismatch = event.city !== updatedProfile.city;
  const stateMismatch = event.state !== updatedProfile.state;

  const skillsMismatch = event.skillsRequired.some(
    skill => !updatedProfile.skills.includes(skill)
  );

  const eventDateStr = new Date(event.date).toISOString().slice(0, 10);
  const profileDatesStr = updatedProfile.availableDates.map(date =>
    new Date(date).toISOString().slice(0, 10)
  );
  const dateMismatch = !profileDatesStr.includes(eventDateStr);
console.log("Checking event vs profile:");
console.log("Event title:", event.title);
console.log("Event city/state:", event.city, event.state);
console.log("Profile city/state:", updatedProfile.city, updatedProfile.state);
console.log("Event date:", event.date.toISOString().slice(0, 10));
console.log("Profile dates:", updatedProfile.availableDates.map(d => new Date(d).toISOString().slice(0, 10)));
console.log("Event skills:", event.skillsRequired);
console.log("Profile skills:", updatedProfile.skills);

  return stateMismatch || skillsMismatch || dateMismatch;
  
});


    if (hasConflict) {
      return res.status(400).json({
        error: "Cannot update profile. You are assigned to events that require your current state, skills, or available dates.",
      });
    }

    // Proceed with update
    const profile = await UserProfile.findOneAndUpdate(
      { credentialId: accountId },
      { ...updatedProfile, credentialId: accountId },
      { new: true, upsert: true, runValidators: true }
    );

    user.isProfileComplete = true;
    await user.save();

    res.status(200).json({ message: "Profile saved", profile });
  } catch (err) {
    console.error("updateProfile error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// PATCH /api/verify/:accountId
export const verifyUser = async (req, res) => {
  try {
    const { accountId } = req.params;
    const user = await UserCredentials.findById(accountId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: "User verified successfully." });
  } catch (err) {
    console.error("verifyUser error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
