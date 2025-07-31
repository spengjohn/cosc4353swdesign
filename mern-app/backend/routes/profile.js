import express from "express";
import { getProfile, updateProfile } from "../controllers/profileController.js";

const router = express.Router();

router.get("/:accountId", getProfile);
router.post("/:accountId", updateProfile);

export default router;
