import express from "express";

import { getHistory } from "../controllers/volunteerHistoryController.js";

const router = express.Router();

router.get("/:accountId", getHistory);

export default router;