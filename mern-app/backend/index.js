import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import profileRoutes from "./routes/profile.js";
import loginRegisterRoutes from "./routes/loginRegister.js"; 
import notificationRoutes from "./routes/notification.js";
import volunteerMatchRoutes from "./routes/volunteerMatching.js";
import eventRoutes from "./routes/event.js";
import connectDB from './config/db.js';

dotenv.config();

const app = express();
const FRONT_PORT = process.env.FRONT_PORT;
const PORT = process.env.PORT;
const dbUri = process.env.MONGO_URI;

connectDB();

app.use(cors({
  origin: `http://localhost:${FRONT_PORT}`,
  credentials: true
}));
app.use(express.json());

app.use("/api/profile", profileRoutes);
app.use("/api/auth", loginRegisterRoutes);
app.use("/api/volmatch", volunteerMatchRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/events", eventRoutes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
  });
}

export default app;
