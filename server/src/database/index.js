import mongoose from "mongoose";
import { MONGO_URI } from "../constant.js";

export const dbConnect = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log("Database connected");
    } catch (error) {
        console.log("Database connection error:", error.message);
    }
}