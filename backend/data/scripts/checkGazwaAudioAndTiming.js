import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import XLSX from "xlsx";
import gazwaModel from "../../models/gazwaModel.js";
import { connectDB } from "../../config/db.js";

dotenv.config();

const normalize = (str) =>
    str
        ?.replace(/\s+/g, " ")
        .replace(/\u0640/g, "") // tatweel
        .replace(/\u200C|\u200D/g, "") // zero-width characters
        .trim();

const run = async () => {
    await connectDB();

    const scriptsFolder = path.resolve();
    const jsonPath = path.join(scriptsFolder, "all_words_combined.json");
    const audioFolder = path.join(scriptsFolder, "stories");
    const excelPath = path.join(scriptsFolder, "الغزوات.xlsx");

    const allTimings = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
    const workbook = XLSX.readFile(excelPath);
    const sheetName = workbook.SheetNames[0];
    const excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const correctNames = excelData.map(row => row["الاسم"]?.trim()).filter(Boolean);

    console.log("🔍 Checking matches...\n");

    // Counters
    let excelCount = 0;
    let dbCount = 0;
    let audioCount = 0;
    let timingCount = 0;

    for (const [filename, timings] of Object.entries(allTimings)) {
        const cleanName = filename.split(" - ")[1].replace(".mp3", "").trim();
        const audioPath = path.join(audioFolder, filename);

        const normalizedName = normalize(cleanName);
        const existsInExcel = correctNames.some(name => normalize(name) === normalizedName);
        const inExcel = existsInExcel ? "📄" : "❌";
        if (existsInExcel) excelCount++;

        const gazwa = await gazwaModel.findOne({ name: cleanName });
        const inDB = gazwa ? "🕌" : "❌";
        if (gazwa) dbCount++;

        const audioExists = fs.existsSync(audioPath);
        const hasAudio = audioExists ? "📼" : "❌";
        if (audioExists) audioCount++;

        const hasValidTimings = timings?.length > 0;
        const hasTimings = hasValidTimings ? "⏱️" : "❌";
        if (hasValidTimings) timingCount++;

        console.log(`${cleanName} → Excel: ${inExcel} | DB: ${inDB} | Audio: ${hasAudio} | Timings: ${hasTimings}`);
    }

    // Final summary
    console.log(`\n✅ Summary:`);
    console.log(`📄 Excel matches: ${excelCount}`);
    console.log(`🕌 Database matches: ${dbCount}`);
    console.log(`📼 Audio files found: ${audioCount}`);
    console.log(`⏱️ Timings found: ${timingCount}`);

    mongoose.connection.close();
};

run();
