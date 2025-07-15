import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import gazwaModel from "../models/gazwaModel.js";
import { connectDB } from "../config/db.js";

dotenv.config();

const run = async () => {
  await connectDB();

  const jsonFolder = "C:/Users/joodt/OneDrive/سطح المكتب/Raya.github.io/backend";
  const mb3Folder = "C:/Users/joodt/OneDrive/سطح المكتب/Raya.github.io/backend/stories";
  const audioFolder = path.join(mb3Folder, "public", "audios");
  const jsonPath = path.join(jsonFolder, "story_time_stamps.json");

  const allTimings = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

  let updatedCount = 0;

  for (const [filename, timings] of Object.entries(allTimings)) {
    const cleanName = filename.split(" - ")[1].replace(".mp3", "").trim();

    const gazwa = await gazwaModel.findOne({ name: cleanName });

    if (!gazwa) {
      console.warn(`⚠️ No gazwa found for "${cleanName}"`);
      continue;
    }

    gazwa.audioUrl = `/audios/${filename}`;
    gazwa.timings = timings;

    await gazwa.save();
    updatedCount++;
    console.log(`✅ Updated: ${cleanName}`);
  }

  console.log(`\n🎉 Finished. Total updated: ${updatedCount}`);
  mongoose.connection.close();
};

run();
