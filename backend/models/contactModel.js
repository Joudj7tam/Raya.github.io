import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: [true, "الاسم الأول مطلوب"],
    trim: true,
    minlength: [2, "الاسم الأول يجب أن يكون على الأقل حرفين"],
  },
  lname: {
    type: String,
    required: [true, "الاسم الأخير مطلوب"],
    trim: true,
    minlength: [2, "الاسم الأخير يجب أن يكون على الأقل حرفين"],
  },
  email: {
    type: String,
    required: [true, "البريد الإلكتروني مطلوب"],
    match: [/\S+@\S+\.\S+/, "صيغة البريد الإلكتروني غير صحيحة"],
  },
  phone: {
    type: Number,
    required: [true, "رقم الجوال مطلوب"],
    validate: {
      validator: (v) => /^[0-9]{9}$/.test(v),
      message: "رقم الجوال يجب أن يتكون من 9 أرقام",
    },
  },
  category: {
    type: String,
    enum: ["اقتراحات", "استفسارات", "بلاغات", ""],
    default: "",
  },
  subject: {
    type: String,
    trim: true,
  },
  help: {
    type: String,
    required: [true, "الرسالة مطلوبة"],
    minlength: [20, "الرسالة يجب أن تكون على الأقل 20 حرفًا"],
  },
});

const ContactModel = mongoose.models.contact || mongoose.model("contact", ContactSchema);
export default ContactModel;
