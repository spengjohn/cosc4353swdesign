import express from "express";
import { getProfile, updateProfile, getHistory, getAttendedHistory, verifyUser } from "../controllers/profileController.js";

const router = express.Router();

router.get("/history/:accountId", getHistory);
router.get("/attended/:accountId", getAttendedHistory);
router.get("/:accountId", getProfile);
router.post("/:accountId", updateProfile);
router.patch('/verify/:accountId', verifyUser);

export default router;
