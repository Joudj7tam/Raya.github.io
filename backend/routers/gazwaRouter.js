import express from "express";
import { addGazwa, getAllGazwa } from "../controllers/gazwaController.js";

const gazwaRouter = express.Router();

gazwaRouter.post("/add", addGazwa);
gazwaRouter.get("/all", getAllGazwa);

export default gazwaRouter;