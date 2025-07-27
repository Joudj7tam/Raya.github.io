import express from "express";
import { addContact } from "../controllers/contactController.js";

const contactRouter = express.Router();

// Route to handle adding a new contact message
contactRouter.post("/add", addContact);

export default contactRouter;
