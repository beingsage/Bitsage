import { Router } from "express";
import  {roadmap, updateRoadmap,uploadRoadmap,  deleteRoadmap }  from "../controllers/Roadmap.Controller.js";

const router = Router();

router.get("/roadmap", roadmap);
router.post("/roadmap/upload", uploadRoadmap );
router.put("/roadmap/update", updateRoadmap );
router.delete("/roadmap/delete", deleteRoadmap );


export default router;