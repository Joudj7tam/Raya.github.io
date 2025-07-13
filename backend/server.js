import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import gazwaRouter from "./routers/gazwaRouter.js";
import contactRouter from "./routers/contactRouter.js";

//app config
const app = express()
const port = 4000

//middleware
app.use(express.json())
app.use(cors())

// API routes
app.use("/api/gazwa", gazwaRouter);
app.use("/api/contact", contactRouter);

//DB connection
connectDB();

app.get("/", (req,res)=>{
    res.send("API Working")
})

app.listen(port,(req,res)=>{
    console.log(`Server started on http://localhost:${port}`)
})