import VolunteerHistory from "../models/VolunteerHistory.js";

export const getHistory = async (req, res) => {
  try {
    const { accountId } = req.params;
    //console.log("Incoming accountId:", accountId);
    //console.log("Type of accountId:", typeof accountId);
    const history = await VolunteerHistory.findOne({credentialId: accountId});
    //const history = await VolunteerHistory.find();
    //console.log("Query result:", history);
    if (!history){
      return res.status(404).json({message: "Volunteer History not found."});
    }

    console.log("Returning full history:", history);
    res.status(200).json(history);
  } catch (err) {
    console.error("getHistory error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


