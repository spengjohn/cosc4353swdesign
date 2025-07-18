import express from "express";
import { getProfile, updateProfile, getHistory } from "../controllers/profileController.js";

const router = express.Router();

router.get("/history/:accountId", getHistory)
router.get("/:accountId", getProfile);
router.post("/:accountId", updateProfile);

export default router;
