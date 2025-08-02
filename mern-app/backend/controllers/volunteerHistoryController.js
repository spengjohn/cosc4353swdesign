import VolunteerHistory from "../models/VolunteerHistory.js";

export const getHistory = async (req, res) => {
  try {
    const { accountId } = req.params;
    const history = await VolunteerHistory.findOne({credentialId: accountId});
    if (!history){
      return res.status(404).json({message: "Volunteer History not found."});
    }
    res.status(200).json(history);
  } catch (err) {
    console.error("getHistory error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
