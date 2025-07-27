import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: [true, "الاسم الأول مطلوب"], // First name required
    trim: true,
    minlength: [2, "الاسم الأول يجب أن يكون على الأقل حرفين"], // Min length 2 chars
  },
  lname: {
    type: String,
    required: [true, "الاسم الأخير مطلوب"], // Last name required
    trim: true,
    minlength: [2, "الاسم الأخير يجب أن يكون على الأقل حرفين"], // Min length 2 chars
  },
  email: {
    type: String,
    required: [true, "البريد الإلكتروني مطلوب"], // Email required
    match: [/\S+@\S+\.\S+/, "صيغة البريد الإلكتروني غير صحيحة"], // Simple email regex validation
  },
  phone: {
    type: Number,
    required: [true, "رقم الجوال مطلوب"], // Phone number required
    validate: {
      validator: (v) => /^[0-9]{9}$/.test(v), // Exactly 9 digits
      message: "رقم الجوال يجب أن يتكون من 9 أرقام",
    },
  },
  category: {
    type: String,
    enum: ["اقتراحات", "استفسارات", "بلاغات", ""], // Allowed categories + empty string for optional
    default: "",
  },
  subject: {
    type: String,
    trim: true, // Optional subject, trimmed
  },
  help: {
    type: String,
    required: [true, "الرسالة مطلوبة"], // Message required
    minlength: [20, "الرسالة يجب أن تكون على الأقل 20 حرفًا"], // Minimum length 20 chars
  },
});

const ContactModel = mongoose.models.contact || mongoose.model("contact", ContactSchema);
export default ContactModel;
