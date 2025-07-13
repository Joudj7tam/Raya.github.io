import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  fname: { type: String},
  lname: { type: String},
  email: { type: String},
  phone: { type: Number},
  category: { type: String},
  subject: { type: String},
  help: { type: String}
})
const ContactModel = mongoose.models.contact || mongoose.model("contact", ContactSchema)

export default ContactModel;