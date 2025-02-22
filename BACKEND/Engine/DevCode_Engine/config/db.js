import mongoose from "mongoose"
import dotenv from "dotenv"
import path from "path"
dotenv.config({
    path: path.resolve('./src/.env') 
})

console.log(process.env.MONGO_URI);

const connectDB = async () => {
    try {
        const connectionInstance     =   await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected successfully to ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MongoDB connection failed", error)
    }
}

export default connectDB


