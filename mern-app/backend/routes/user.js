import express from "express";
const router = express.Router();
import User from "../models/User.js";

// Mocked route for now
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Replace this with real DB query later
    const mockUser = {
      _id: id,
      fullName: "Jane Doe",
      address1: "123 Main St",
      address2: "Apt 4B",
      zipcode: "12345",
      city: "Houston",
      state: "TX",
      skills: ["Cooking", "Teaching"],
      preferences: "No pets",
      availableDates: [new Date(), new Date(Date.now() + 86400000)],
      role: "volunteer",
      isProfileComplete: true,
    };

    res.json(mockUser);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    // You'd use Mongoose later like:
    // const user = await User.findByIdAndUpdate(id, updatedData, { new: true });

    // For now, simulate the update:
    console.log("Received update for user:", id);
    console.log("Updated data:", updatedData);

    res.json({ message: "User profile updated", user: updatedData });
  } catch (err) {
    res.status(500).json({ error: "Failed to update user" });
  }
});

export default router;

