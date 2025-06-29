import mongoose from "mongoose";

export const connectDB = async() => {
    mongoose.connect('mongodb+srv://Joudj7tam:Joudj7tam@cluster0.voofezq.mongodb.net/Legasy').then(()=>console.log("DB Connected"));
}