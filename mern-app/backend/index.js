// index.js
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json()); // For JSON request bodies

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.post("/api/test", (req, res) => {
  console.log("Received data:", req.body);
  res.json({ message: "Data received!", data: req.body });
});

app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});
