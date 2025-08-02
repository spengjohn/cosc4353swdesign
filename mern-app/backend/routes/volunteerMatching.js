import express from "express";

import { getMatches } from "../controllers/volunteerMatchingController.js";

const router = express.Router();

router.get("/:eventId", getMatches);

export default router;