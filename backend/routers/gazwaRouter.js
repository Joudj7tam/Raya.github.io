import express from "express";
import { addGazwa, getAllGazwa, getGazwaById } from "../controllers/gazwaController.js";

const gazwaRouter = express.Router();

gazwaRouter.post("/add", addGazwa);
gazwaRouter.get("/all", getAllGazwa);
gazwaRouter.get("/:id", getGazwaById);

export default gazwaRouter;