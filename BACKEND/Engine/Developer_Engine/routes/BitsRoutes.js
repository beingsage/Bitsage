import { Router } from "express";
import  {processBits, updateBits ,updateDays, updateHours, updateMins}  from "../controllers/BitsController.js";

const router = Router();


router.post("/process", processBits);
router.put("/update_b", updateBits);
router.put("/update_m", updateMins);
router.put("/update_h", updateHours);
router.put("/update_d", updateDays);





export default router;