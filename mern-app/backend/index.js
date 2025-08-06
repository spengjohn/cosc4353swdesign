import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";

import profileRoutes from "./routes/profile.js";
import loginRegisterRoutes from "./routes/loginRegister.js"; 
import notificationRoutes from "./routes/notification.js";
import volunteerMatchRoutes from "./routes/volunteerMatching.js";
import eventRoutes from "./routes/event.js";
import VolunteerHistoryRoutes from './routes/volunteerHistory.js';
import reportRoutes from './routes/report.js';

import connectDB from './config/db.js';

// dotenv.config();
dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

const app = express();
const FRONT_URL = process.env.FRONT_URL;
const PORT = process.env.PORT;

connectDB();

app.use(cors({
  origin: `${FRONT_URL}`, // Adjust if your frontend is on a different port
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true
}));
app.use(express.json());

app.use("/api/profile", profileRoutes);
app.use("/api/auth", loginRegisterRoutes);
app.use("/api/volmatch", volunteerMatchRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/history", VolunteerHistoryRoutes);
app.use("/api/reports", reportRoutes)

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    //console.log(`Backend server running at http://localhost:${PORT}`);
  });
}

export default app;
