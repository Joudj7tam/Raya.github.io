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
        res.json({ success: true, message: "Contact added successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export { addContact };