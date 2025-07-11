// index.js
import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import profileRoutes from "./routes/profile.js";
dotenv.config();

const app = express();
const FRONT_URL = process.env.FRONT_URL;
const PORT = process.env.PORT;
const dbUri = process.env.MONGO_UIR;

app.use(cors({
  origin: `${FRONT_URL}`, // Adjust if your frontend is on a different port
  credentials: true
}));
app.use(express.json()); // For JSON request bodies


app.use("/api/profile", profileRoutes)


if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
  });
}


export default app; // <-- Important for tests