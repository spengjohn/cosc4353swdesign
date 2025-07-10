import express from 'express';
import { getUserProfile } from '../controllers/userController.js';
const router = express.Router();

router.get("/:id", (req, res) => {
  const mockUser = {
    _id: req.params.id,
    email: "john@example.com",
    fullName: "John Doe",
    address1: "123 Main St",
    address2: "",
    zipcode: "12345",
    city: "Houston",
    state: "TX",
    skills: ["Cooking", "Teaching"],
    preferences: "Available weekends only",
    availableDates: ["2025-08-01", "2025-08-05"],
    role: "volunteer",
    isProfileComplete: true,
  };

  res.json(mockUser);
});

export default router;
