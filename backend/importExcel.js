import mongoose from "mongoose";
import XLSX from "xlsx";
import { connectDB } from "./config/db.js"; // ✅ Import your connection function
import gazwaModel from "./models/gazwaModel.js"; // adjust path if needed

// ✅ Connect to MongoDB Atlas
connectDB();

// ✅ Load Excel file
const workbook = XLSX.readFile("الغزوات.xlsx");
const sheetName = workbook.SheetNames[0];
const rawData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

// ✅ Map Arabic fields to schema fields
const mappedData = rawData.map(row => ({
  name: row["الاسم"],
  type: row["نوع الحدث"],
  area_to_open: row["فتح"],
  year: row["التاريخ"],
  leader_of_muslims: row["القائد"],
  era: row["عهد"],
  location: row["الموقع"],
  number_of_muslims: row["عدد المسلمين"],
  enemy: row["الأعداء"],
  number_of_enemy: row["عدد الأعداء"],
  leader_of_enemy: row["قائد الأعداء"],
  story: row["القصة"],
  result: row["النتيجة النهائية"],
  cause: row["أسبابها"],
  effect: row["آثارها"],
  source: row["المصدر"]
}));

// ✅ Insert into MongoDB
gazwaModel.insertMany(mappedData, { ordered: false })
  .then((docs) => {
    console.log(`✅ Inserted ${docs.length} out of ${mappedData.length} documents`);
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("❌ Error inserting data:");
    console.error(err.writeErrors.map(e => e.err.message)); // Print all error messages
    mongoose.connection.close();
  });

