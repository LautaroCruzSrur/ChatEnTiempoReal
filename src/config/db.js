import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const connectDB = async () => {

    const queryString = process.env.DB_STRING;
    if (!queryString) {
        throw new Error("❌ ERROR: No se encontró la variable DB_STRING en el .env");
    }

    try {
        await mongoose.connect(queryString);
        console.log('DB connected');
    } catch (error) {
        console.log('DB connection failed');
    }
}


export default connectDB();