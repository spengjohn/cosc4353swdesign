import express from "express";
import { getProfile, updateProfile, verifyUser } from "../controllers/profileController.js";

const router = express.Router();

router.get("/:accountId", getProfile);
router.post("/:accountId", updateProfile);
router.patch('/verify/:accountId', verifyUser);

export default router;
