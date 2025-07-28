import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import gazwaModel from "../../models/gazwaModel.js";
import { connectDB } from "../../config/db.js";

dotenv.config();

const updateSpecificGazwaTimings = async () => {
  try {
    await connectDB();

    // 🔧 Step 1: Specify the file you want to update
    const selectedFileName = "40 - معركة أليس.json"; // 📝 change this filename as needed

    // 🔍 Step 2: Build the full path
    const folderPath = path.resolve(__dirname, "../ghazawat_time_stamps");
    const jsonFilePath = path.join(folderPath, selectedFileName);

    // 📄 Step 3: Read and parse the file
    if (!fs.existsSync(jsonFilePath)) {
      console.error(`❌ File not found: ${jsonFilePath}`);
      mongoose.connection.close();
      return;
    }

    const timings = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));

    // 🧠 Step 4: Extract gazwa name from the filename
    const gazwaName = selectedFileName.split(" - ")[1].replace(".json", "").trim();

    // 🔎 Step 5: Find gazwa in DB
    const gazwa = await gazwaModel.findOne({ name: gazwaName });

    if (!gazwa) {
      console.warn(`❌ Gazwa not found in DB: ${gazwaName}`);
      mongoose.connection.close();
      return;
    }

    // 💾 Step 6: Update and save
    gazwa.timings = timings;
    await gazwa.save();

    console.log(`✅ Timings updated for: ${gazwaName}`);
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error during update:", error);
    mongoose.connection.close();
  }
};

updateSpecificGazwaTimings();
