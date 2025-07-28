import ContactModel from "../models/contactModel.js";

// Add a new contact message to the database
const addContact = async (req, res) => {
  const contact = new ContactModel({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    phone: req.body.phone,
    category: req.body.category,
    subject: req.body.subject,
    help: req.body.help,
  });

  try {
    await contact.save(); // Save the new contact document
    res.status(200).json({ success: true, message: "تم إرسال الرسالة بنجاح" });
  } catch (error) {
    if (error.name === "ValidationError") {
      // Collect validation error messages and send them all in the response
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(" | "),
      });
    }

    // For other errors, return a generic server error message
    res.status(500).json({
      success: false,
      message: "حدث خطأ في الخادم، يرجى المحاولة لاحقًا",
    });
  }
};

export { addContact };
