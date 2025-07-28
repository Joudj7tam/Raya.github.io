import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import gazwaModel from "../../models/gazwaModel.js";
import { connectDB } from "../../config/db.js";

dotenv.config();

const updateAllGazwaTimings = async () => {
  try {
    await connectDB();

    const folderPath = path.resolve(__dirname, "../ghazawat_time_stamps");

    const files = fs.readdirSync(folderPath).filter(file => file.endsWith(".json"));

    if (files.length === 0) {
      console.warn("⚠️ No JSON files found in the folder.");
      mongoose.connection.close();
      return;
    }

    for (const fileName of files) {
      const filePath = path.join(folderPath, fileName);

      try {
        const timings = JSON.parse(fs.readFileSync(filePath, "utf-8"));

        const gazwaName = fileName.split(" - ")[1]?.replace(".json", "").trim();

        if (!gazwaName) {
          console.warn(`⚠️ Skipping file with unexpected format: ${fileName}`);
          continue;
        }

        const gazwa = await gazwaModel.findOne({ name: gazwaName });

        if (!gazwa) {
          console.warn(`❌ Gazwa not found in DB: ${gazwaName}`);
          continue;
        }

        gazwa.timings = timings;
        await gazwa.save();

        console.log(`✅ Timings updated for: ${gazwaName}`);
      } catch (fileErr) {
        console.error(`❌ Error processing file ${fileName}:`, fileErr.message);
      }
    }

    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error during batch update:", error);
    mongoose.connection.close();
  }
};

updateAllGazwaTimings();
