import dotenv from "dotenv"
import connectDB from "./config/db.js";
import app from './app.js'
import path from "path"
dotenv.config({
    path: path.resolve('./.env') 
})


 app.listen(process.env.PORT || 5000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
  });