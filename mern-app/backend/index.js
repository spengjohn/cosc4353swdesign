// index.js
import express from 'express';
import cors from 'cors';
import dotenv from "dotenv"
import userRoutes from "./routes/user.js"; // ✅ import the route
dotenv.config();

const app = express();
const FRONT_PORT = process.env.FRONT_PORT;
const PORT = process.env.PORT;
const dbUri = process.env.MONGO_UIR;

app.use(cors({
  origin: 'http://localhost:${FRONT_PORT}', // Adjust if your frontend is on a different port
  credentials: true
}));
app.use(express.json()); // For JSON request bodies

// ✅ Mount user routes
app.use("/api/users", userRoutes);
/*
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.post("/api/test", (req, res) => {
  console.log("Received data:", req.body);
  res.json({ message: "Data received!", data: req.body });
});*/

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
  });
}


export default app; // <-- Important for tests