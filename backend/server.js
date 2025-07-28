import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import gazwaRouter from "./routers/gazwaRouter.js";
import contactRouter from "./routers/contactRouter.js";

// Initialize Express app
const app = express();
const port = 4000;

// Middleware
// Serve static audio files from 'audio' folder when accessing /audios route
app.use("/audios", express.static("data/audio"));

// Parse incoming JSON requests
app.use(express.json());

// Enable CORS for cross-origin requests
app.use(cors());

// API routes
app.use("/api/gazwa", gazwaRouter);
app.use("/api/contact", contactRouter);

// Connect to MongoDB database
connectDB();

// Basic root route to check API status
app.get("/", (req, res) => {
  res.send("API Working");
});

// Start server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
