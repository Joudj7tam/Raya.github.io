import mongoose from "mongoose";
import XLSX from "xlsx";
import fetch from "node-fetch";
import { connectDB } from "./config/db.js";

// The base URL to add gazwa
const API_URL = "http://localhost:4000/api/gazwa/add";

const run = async () => {
  try {
    await connectDB();

    const workbook = XLSX.readFile("الغزوات.xlsx");
    const sheetName = workbook.SheetNames[0];
    const rawData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const mappedData = rawData.map(row => ({
      name: row["الاسم"],
      type: row["نوع الحدث"],
      area_to_open: row["فتح"],
      year: row["التاريخ"] !== undefined ? row["التاريخ"] : "لا يوجد سنة",
      leader_of_muslims: row["القائد"],
      era: row["عهد"],
      location: row["الموقع"],
      number_of_muslims: row["عدد المسلمين"] !== undefined ? row["عدد المسلمين"] : "غير محدد",
      enemy: row["الأعداء"],
      number_of_enemy: row["عدد الأعداء"] !== undefined ? row["عدد الأعداء"] : "غير محدد",
      leader_of_enemy: row["قائد الأعداء"],
      story: row["القصة"],
      result: row["النتيجة النهائية"],
      cause: row["أسبابها"],
      effect: row["آثارها"],
      source: row["المصدر"],
      country: row["الدولة"]
    }));

    let successCount = 0;
    for (const gazwa of mappedData) {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gazwa),
      });

      const data = await response.json();
      if (data.success) successCount++;
      else console.error(`Failed: ${data.message}`);
    }

    console.log(`Inserted ${successCount} out of ${mappedData.length} entries via API`);
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    mongoose.connection.close();
  }
};

run();
