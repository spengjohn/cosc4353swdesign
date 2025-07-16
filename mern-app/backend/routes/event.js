import express from "express";
import { getAttendees, getEvent, updateEvent } from "../controllers/eventController.js";

const router = express.Router();

router.get("/:eventId", getEvent);
router.post("/:eventId", updateEvent);
router.get("/assigned/:eventId", getAttendees);
//router.post("/assigned/:accountId", UpdateAttendees);

export default router;