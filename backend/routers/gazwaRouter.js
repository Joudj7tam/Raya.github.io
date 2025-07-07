import express from "express"
import { addGazwa } from "../controllers/gazwaController.js";

const gazwaRouter = express.Router();

gazwaRouter.post("/add", addGazwa)

export default gazwaRouter;