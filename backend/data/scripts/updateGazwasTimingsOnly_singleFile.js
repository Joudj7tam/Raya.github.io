import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import gazwaModel from "../models/gazwaModel.js";
import { connectDB } from "../config/db.js";

dotenv.config();

const updateTimings = async () => {
  try {
    await connectDB();

    const jsonFilePath = path.join(
      "C:/Users/joodt/OneDrive/سطح المكتب/Raya.github.io/backend/data",
      "timestamps.json"
    );

    const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));

    let updated = 0;
    let notFound = [];

    for (const [fileName, timings] of Object.entries(jsonData)) {
      const gazwaName = fileName.split(" - ")[1].replace(".mp3", "").trim();

      const gazwa = await gazwaModel.findOne({ name: gazwaName });

      if (!gazwa) {
        notFound.push(gazwaName);
        console.warn(`❌ Not found: ${gazwaName}`);
        continue;
      }

      gazwa.timings = timings;
      await gazwa.save();
      updated++;
      console.log(`✅ Timings updated for: ${gazwaName}`);
    }

    console.log(`\n✅ Done! ${updated} gazawat updated.`);
    if (notFound.length > 0) {
      console.log(`\n❗ Could not find ${notFound.length} gazawat:`);
      console.log(notFound.join(", "));
    }

    mongoose.connection.close();
  } catch (error) {
    console.error("Error during update:", error);
    mongoose.connection.close();
  }
};

updateTimings();
