import express from "express";
import { 
  addGazwa, 
  getAllGazwa, 
  getGazwaById, 
  getGazwaByCountry, 
  getGazwaByYear, 
  getAllYears 
} from "../controllers/gazwaController.js";

const gazwaRouter = express.Router();

// Get gazwa records filtered by country
gazwaRouter.get("/by-country", getGazwaByCountry);

// Add a new gazwa record
gazwaRouter.post("/add", addGazwa);

// Get all gazwa records with pagination and filters
gazwaRouter.get("/all", getAllGazwa);

// Get all unique years for gazwa records
gazwaRouter.get("/years", getAllYears);

// Get gazwa records filtered by a specific year
gazwaRouter.get("/by-year", getGazwaByYear);

// Get gazwa by its unique ID
gazwaRouter.get("/:id", getGazwaById);

export default gazwaRouter;
