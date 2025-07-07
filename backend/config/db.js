import mongoose from "mongoose";

export const connectDB = async() => {
    mongoose.connect('mongodb+srv://Joudj7tam:Joudj7tam@cluster0.voofezq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>console.log("DB Connected"));
}