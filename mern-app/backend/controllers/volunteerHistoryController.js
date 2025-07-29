import { mockProfiles } from "../mocks/mockProfiles.js";

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

