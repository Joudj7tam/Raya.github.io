import express from "express";
import { addGazwa, getAllGazwa, getGazwaById, getGazwaByCountry, getGazwaByYear, getAllYears } from "../controllers/gazwaController.js";

const gazwaRouter = express.Router();

gazwaRouter.get("/by-country", getGazwaByCountry);
gazwaRouter.post("/add", addGazwa);
gazwaRouter.get("/all", getAllGazwa);
gazwaRouter.get("/years", getAllYears);
gazwaRouter.get("/by-year", getGazwaByYear);
gazwaRouter.get("/:id", getGazwaById);



export default gazwaRouter;