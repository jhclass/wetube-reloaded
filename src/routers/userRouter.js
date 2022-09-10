import express from "express";
import { remove,edit,logout,see } from "../controllers/userController";
const userRounter = express.Router();
//const handleEdit = (req,res)=>res.send("Edit Users!");
//const handleDelete = (req,res)=>res.send("Delete Users!");
userRounter.get("logout",logout);
userRounter.get("/edit",edit);
userRounter.get("/remove",remove);
userRounter.get(":id",see);


export default userRounter;