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




// portfolio engine routes
app.get("/", (req, res) => {
    res.send("Portfolio Engine is running...");
  });

import portfolioRoutes from './routes/Portfolio.Routes.js'
import roadmapRoutes from './routes/Roadmap.Routes.js'
import templateRoutes from './routes/Template.Routes.js'
import bitsfolioRoutes from './routes/Bitsfolio.Routes.js'
import proportRoutes from './routes/Proport.Routes.js'
import postmapRoutes from './routes/Postmap.Routes.js'

app.use("/portfolio", portfolioRoutes); // Primary Routes
app.use("/portfolio/roadmap", roadmapRoutes); 
app.use("/portfolio/template", templateRoutes); 
app.use("/portfolio/bitsfolio", bitsfolioRoutes);
app.use("/portfolio/proport", proportRoutes);
app.use("/portfolio/postmap", postmapRoutes);



  






// Error Handler
app.use(errorHandler);
export default app;