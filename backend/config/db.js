import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://Joudj7tam:Joudj7tam@cluster0.voofezq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log("DB Connected");
  } catch (error) {
    console.error("❌ DB connection failed:", error.message);
    throw error;
  }
};
