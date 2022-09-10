import express from "express";
import { remove,edit } from "../controllers/userController";
const userRounter = express.Router();
//const handleEdit = (req,res)=>res.send("Edit Users!");
//const handleDelete = (req,res)=>res.send("Delete Users!");

userRounter.get("/edit",edit);
userRounter.get("/remove",remove);


export default userRounter;