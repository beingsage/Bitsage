import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import errorHandler from "./utils/errorHandler.js";
import connectDB from "./config/db.js";


dotenv.config();
const app = express();
connectDB();
app.use(express.json());

// app.use(cors({
//     origin: process.env.FRONTEND_URL || 'http://localhost:5173',
//     credentials: true
// }));



app.get("/", (req, res) => {
    res.send("You Are Communicating With Devcode Engine");
});

// devcode engine routes
import QuestionRoutes from "./routes/QuestionRoutes.js";

app.use("/questions", QuestionRoutes);





// Error Handler
app.use(errorHandler);
export default app;