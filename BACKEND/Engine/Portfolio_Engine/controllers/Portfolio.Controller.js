import express from 'express';
import Bit from '../models/Portfolio.Model.js';
import { mongo } from "mongoose";
const  router = express.Router();  
import { roles } from "../mockData.js" 

const Roles = async (req, res) => {
   const roleNames = roles.map(role => role.role);
   res.json({ roles: roleNames });
}
 
 const roleDetails = async (req, res) => {
   const { role } = req.body; // Extract the role name from request body
   const foundRole = Roles.find(r => r.role === role); // Search for the role
 
   if (!foundRole) {
       return res.status(404).json({ message: "Role not found" });
   }
 
   res.json(foundRole); // Return full role details
 };


// const roleDetails = async (req, res) => {
//    const roleID =  req.body;
//    res.json({roles.roleID});
// }

const userRole = async (req, res) => {
  const userPreferences =  req.body;
  
 try {
  
 } catch (error) {
  
 }
}


export {Roles, roleDetails, userRole};
