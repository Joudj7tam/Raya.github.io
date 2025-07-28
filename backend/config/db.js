import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    // Connect to MongoDB using connection string from environment variables
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB Connected");
  } catch (error) {
    console.error("❌ DB connection failed:", error.message);
    throw error;
  }
};
