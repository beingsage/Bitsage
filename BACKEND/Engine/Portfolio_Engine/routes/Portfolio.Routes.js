import { Router } from "express";
import  {Roles, roleDetails, userRole}  from "../controllers/Portfolio.Controller.js";

const router = Router();

router.get("/roles", Roles);
router.get("role/:id", roleDetails);
router.post("role/user/:id/",userRole);


export default router;