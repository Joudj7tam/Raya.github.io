import mongoose from "mongoose"

const gazwaSchema = new mongoose.Schema({
    name: { type: String},
    type: { type: String, enum: ['غزوة', 'فتح', 'معركة', 'معركة لفتح']},
    area_to_open: { type: String},
    year: { type: Number},
    leader_of_muslims: { type: String},
    era: { type: String, enum: ['النبي محمد ﷺ', 'أبو بكر الصديق رضي الله عنه', 'عمر بن الخطاب رضي الله عنه', 'عثمان بن عفان رضي الله عنه', 'علي بن أبي طالب رضي الله عنه']},
    location: { type: String},
    number_of_muslims: { type: String},
    enemy: { type: String},
    number_of_enemy: { type: String},
    leader_of_enemy: { type: String},
    story: { type: String},
    result: { type: String, enum: ['صلح', 'لم يحدث قتال', 'انتصار', 'هزيمة']},
    cause: { type: String},
    effect: { type: String},
    source: { type: String},
    country: {type: String}
  }, { collection: "gazwa" } );

gazwaSchema.index({ result: 1 });
gazwaSchema.index({ type: 1 });
gazwaSchema.index({ era: 1 });

const gazwaModel = mongoose.models.gazwa || mongoose.model("gazwa", gazwaSchema)

export default gazwaModel;