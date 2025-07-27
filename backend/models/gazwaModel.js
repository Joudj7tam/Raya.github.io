import mongoose from "mongoose"

// Define schema for gazwa
const gazwaSchema = new mongoose.Schema({
  name: { type: String }, // Name of the event
  type: { type: String, enum: ['غزوة', 'فتح', 'معركة', 'معركة لفتح'] }, // Type of event
  area_to_open: { type: String }, // Area to be opened
  year: { type: Number }, // Year in Hijri calendar
  leader_of_muslims: { type: String }, // Muslim leader name
  era: { type: String, enum: [
    'النبي محمد ﷺ',
    'أبو بكر الصديق رضي الله عنه',
    'عمر بن الخطاب رضي الله عنه',
    'عثمان بن عفان رضي الله عنه',
    'علي بن أبي طالب رضي الله عنه'
  ]}, // Historical era
  location: { type: String }, // Location of the event
  number_of_muslims: { type: String }, // Number of Muslim participants
  enemy: { type: String }, // Enemy name or description
  number_of_enemy: { type: String }, // Enemy count
  leader_of_enemy: { type: String }, // Enemy leader
  story: { type: String }, // Detailed story of the event
  result: { type: String, enum: ['صلح', 'لم يحدث قتال', 'انتصار', 'هزيمة'] }, // Outcome of event
  effect: { type: String }, // Effect/consequences of the event
  source: { type: String }, // Source/reference
  country: { type: String }, // Country where event happened
  audioUrl: { type: String }, // URL to audio narration
  timings: [ // Array for audio word timings
    {
      word: String,
      start: Number,
      end: Number
    }
  ]
}, { collection: "gazwa" });

// Create indexes to optimize queries by common fields
gazwaSchema.index({ result: 1 });
gazwaSchema.index({ type: 1 });
gazwaSchema.index({ era: 1 });
gazwaSchema.index({ year: 1 });
gazwaSchema.index({ country: 1 });

// Use existing model if available or create new
const gazwaModel = mongoose.models.gazwa || mongoose.model("gazwa", gazwaSchema)

export default gazwaModel;
