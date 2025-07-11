import express from "express";
import { addGazwa, getAllGazwa, getGazwaById, getGazwaByCountry } from "../controllers/gazwaController.js";

const gazwaRouter = express.Router();

gazwaRouter.get("/by-country", getGazwaByCountry);
gazwaRouter.post("/add", addGazwa);
gazwaRouter.get("/all", getAllGazwa);
gazwaRouter.get("/:id", getGazwaById);

export default gazwaRouter;