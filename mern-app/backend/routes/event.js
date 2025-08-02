import express from "express";
import { createEvent, getCurrentEvents, getMyNextEvents, getEvent, updateEvent, deleteEvent } from "../controllers/eventController.js";

const router = express.Router();
//static first
router.post("/create", createEvent);
router.get("/current", getCurrentEvents);
router.get("/mycurrent/:accountId", getMyNextEvents);
router.post("/delete/:eventId", deleteEvent);

//then dynamic
router.get("/:eventId", getEvent);
router.post("/:eventId", updateEvent);



export default router;