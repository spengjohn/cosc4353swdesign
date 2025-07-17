import express from "express";
import { getAttendees, getCurrentEvents, getEvent, updateEvent } from "../controllers/eventController.js";

const router = express.Router();
//static first
router.get("/current", getCurrentEvents);
//then dynamic
router.get("/:eventId", getEvent);
router.post("/:eventId", updateEvent);

router.get("/assigned/:eventId", getAttendees);
//router.post("/assigned/:accountId", UpdateAttendees);

export default router;