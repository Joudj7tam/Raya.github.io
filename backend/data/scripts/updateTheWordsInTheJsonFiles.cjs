const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");

// Define main folder path (where Excel & JSON folders are)
const mainFolder = path.join(__dirname, "..");

// Excel file path
const excelPath = path.join(mainFolder, "الغزوات.xlsx");

// JSON files folder path
const jsonFolderPath = path.join(mainFolder, "ghazawat_time_stamps");

// Read Excel workbook and sheet
const workbook = xlsx.readFile(excelPath);
const sheetName = workbook.SheetNames[0];  // assuming first sheet
const sheet = workbook.Sheets[sheetName];
const rows = xlsx.utils.sheet_to_json(sheet);

// Function to clean JSON filenames to match with Excel names
function cleanJsonFileName(filename) {
  return filename
    .replace(/^\d+\s*[-–]\s*/, "")   // remove leading number + dash, e.g., "01 - "
    .replace(/_words/i, "")          // remove "_words"
    .replace(/\.json$/i, "")         // remove ".json"
    .trim();
}

let updatedFiles = 0;
let warnings = 0;

rows.forEach(row => {
  const eventName = row["الاسم"];   // Excel event name (assumed correct)
  const storyText = row["القصة"];   // Correct story text

  if (!eventName || !storyText) {
    console.warn(`⚠️ Skipping row with missing "الاسم" or "القصة"`);
    return;
  }

  // Find matching JSON file by cleaned filename = eventName
  const matchedFile = fs.readdirSync(jsonFolderPath).find(file => {
    const cleanedName = cleanJsonFileName(file);
    return cleanedName === eventName;
  });

  if (!matchedFile) {
    console.warn(`⚠️ No matching JSON file found for event: ${eventName}`);
  }

  // Read and parse JSON file
  const jsonPath = path.join(jsonFolderPath, matchedFile);
  let jsonData;

  try {
    jsonData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  } catch (err) {
    console.error(`❌ Failed to parse JSON file: ${matchedFile} - ${err.message}`);
    return;
  }

  if (!Array.isArray(jsonData)) {
    console.error(`❌ JSON file ${matchedFile} does not contain an array as root.`);
    return;
  }

  // Split story text into words by whitespace
  const storyWords = storyText.trim().split(/\s+/);

  // Check if word count matches
  if (storyWords.length !== jsonData.length) {
    console.warn(`⚠️ Word count mismatch for "${eventName}" (Excel words: ${storyWords.length}, JSON words: ${jsonData.length}). Skipping update.`);
    warnings++;
    return;
  }

  // This is where you replace the words but keep timings:
  for (let i = 0; i < jsonData.length; i++) {
    const timingPart = jsonData[i].split(":").slice(1).join(":").trim();
    jsonData[i] = storyWords[i] + ": " + timingPart;
  }

  // Write updated JSON back to file
  try {
    fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2), "utf-8");
    console.log(`✅ Updated: ${matchedFile}`);
    updatedFiles++;
  } catch (err) {
    console.error(`❌ Failed to write JSON file: ${matchedFile} - ${err.message}`);
  }
});

console.log(`\n✅ Finished! ${updatedFiles} file(s) updated.`);
if (warnings > 0) {
  console.log(`⚠️ ${warnings} file(s) skipped due to word count mismatch.`);
}
