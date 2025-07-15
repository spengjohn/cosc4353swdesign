import { mockProfiles } from "../mocks/mockProfiles.js";

export const getProfile = async (req, res) => {
  try {
    const { accountId } = req.params;
    console.log("GET /api/profile/:accountId");
    console.log("accountId:", accountId);

    const profile =
      Object.values(mockProfiles).find((p) => p.accountId === accountId) || {
        accountId,
        fullName: "",
        address1: "",
        address2: "",
        zipcode: "",
        city: "",
        state: "",
        skills: [],
        preferences: "",
        availableDates: [],
        eventHistory: [],
        role: "volunteer",
      };

    console.log("Returning profile:", profile);
    res.json(profile);
  } catch (err) {
    console.error("getProfile error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const updateProfile = async (req, res) => {
  const { accountId } = req.params;
  const updatedProfile = req.body;

  console.log("Mock update for account ID:", accountId);
  console.log("Data received:", updatedProfile);

  // Just echo back the updated profile for now (mock)
  res.json({ message: "Mock profile updated", profile: updatedProfile });
};


export const getHistory = async (req, res) => {
  try {
    const { accountId } = req.params;
    console.log("GET /api/profile/:accountId");
    console.log("accountId:", accountId);

    const history =
      (Object.values(mockProfiles).find((p) => p.accountId === accountId) || { eventHistory: [] }).eventHistory;


    console.log("Returning full history:", history);
    res.json(history);
  } catch (err) {
    console.error("getHistory error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAttendedHistory = async (req, res) => {
  try {
    const { accountId } = req.params;
    console.log("GET /api/profile/:accountId");
    console.log("accountId:", accountId);

const history =
  (Object.values(mockProfiles).find((p) => p.accountId === accountId) || { eventHistory: [] }).eventHistory.filter(event => event.attended);


    console.log("Returning attended history:", history);
    res.json(history);
  } catch (err) {
    console.error("getHistory error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

