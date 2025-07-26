// import { mockProfiles } from "../mocks/mockProfiles.js";

// export const getProfile = async (req, res) => {
//   try {
//     const { accountId } = req.params;
//     console.log("GET /api/profile/:accountId");
//     console.log("accountId:", accountId);

//     const profile =
//       Object.values(mockProfiles).find((p) => p.accountId === accountId) || {
//         accountId,
//         fullName: "",
//         address1: "",
//         address2: "",
//         zipcode: "",
//         city: "",
//         state: "",
//         skills: [],
//         preferences: "",
//         availableDates: [],
//         eventHistory: [],
//         role: "volunteer",
//       };

//     console.log("Returning profile:", profile);
//     res.json(profile);
//   } catch (err) {
//     console.error("getProfile error:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };


// export const updateProfile = async (req, res) => {
//   const { accountId } = req.params;
//   const updatedProfile = req.body;

//   console.log("Mock update for account ID:", accountId);
//   console.log("Data received:", updatedProfile);

//   // Just echo back the updated profile for now (mock)
//   res.json({ message: "Mock profile updated", profile: updatedProfile });
// };


// export const getHistory = async (req, res) => {
//   try {
//     const { accountId } = req.params;
//     console.log("GET /api/profile/:accountId");
//     console.log("accountId:", accountId);

//     const history =
//       (Object.values(mockProfiles).find((p) => p.accountId === accountId) || { eventHistory: [] }).eventHistory;


//     console.log("Returning full history:", history);
//     res.json(history);
//   } catch (err) {
//     console.error("getHistory error:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// export const getAttendedHistory = async (req, res) => {
//   try {
//     const { accountId } = req.params;
//     console.log("GET /api/profile/:accountId");
//     console.log("accountId:", accountId);

//     const history =
//       (Object.values(mockProfiles).find((p) => p.accountId === accountId) || { eventHistory: [] }).eventHistory.filter(event => event.attended);


//     console.log("Returning attended history:", history);
//     res.json(history);
//   } catch (err) {
//     console.error("getHistory error:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };


import UserProfile from '../models/UserProfile.js';
import UserCredentials from '../models/UserCredentials.js';

// GET profile by credentialId
export const getProfile = async (req, res) => {
  try {
    const { accountId } = req.params;
    console.log("GET /api/profile/:accountId", accountId);

    const profile = await UserProfile.findOne({ credentialId: accountId }).populate("stateId");

    if (!profile) {
      return res.status(404).json({ message: "Profile not found." });
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

// HISTORY (keep mocked for now or upgrade later)
export const getHistory = async (req, res) => {
  res.status(501).json({ message: "Event history not implemented yet." });
};

export const getAttendedHistory = async (req, res) => {
  res.status(501).json({ message: "Attended history not implemented yet." });
};
