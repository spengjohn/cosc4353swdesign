import UserProfile from '../models/UserProfile.js';
import UserCredentials from '../models/UserCredentials.js';

// GET profile by credentialId
export const getProfile = async (req, res) => {
  try {
    const { accountId } = req.params;
    console.log("GET /api/profile/:accountId", accountId);

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

// CREATE or UPDATE profile
export const updateProfile = async (req, res) => {
  try {
    const { accountId } = req.params;
    const updatedProfile = req.body;

    console.log("POST /api/profile/:accountId", accountId);
    console.log("Profile data received:", updatedProfile);

    const user = await UserCredentials.findById(accountId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update if exists or insert new
    const profile = await UserProfile.findOneAndUpdate(
      { credentialId: accountId },
      { ...updatedProfile, credentialId: accountId },
      { new: true, upsert: true, runValidators: true }
    );

    // Mark profile as complete
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

// HISTORY (keep mocked for now or upgrade later)
export const getHistory = async (req, res) => {
  res.status(501).json({ message: "Event history not implemented yet." });
};

export const getAttendedHistory = async (req, res) => {
  res.status(501).json({ message: "Attended history not implemented yet." });
};
