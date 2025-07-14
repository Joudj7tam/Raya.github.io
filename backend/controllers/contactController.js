import ContactModel from "../models/contactModel.js";

// Add new contact
const addContact = async (req, res) => {
    const contact = new ContactModel({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        phone: req.body.phone,
        category: req.body.category,
        subject: req.body.subject,
        help: req.body.help
    });

    try {
    await contact.save();
    res.status(200).json({ success: true, message: "تم إرسال الرسالة بنجاح" });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(" | "),
      });
    }

    res.status(500).json({
      success: false,
      message: "حدث خطأ في الخادم، يرجى المحاولة لاحقًا",
    });
  }
};

export { addContact };