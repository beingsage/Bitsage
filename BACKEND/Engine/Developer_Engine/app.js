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




// bitsengine routes
import BitsRoutes from "./routes/BitsRoutes.js";
app.get("/", (req, res) => {
    res.send("You Are Communicating With Bits Engine");
});
app.use("/bits", BitsRoutes);





// Error Handler
app.use(errorHandler);
export default app;