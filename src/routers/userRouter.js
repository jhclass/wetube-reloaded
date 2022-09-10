import express from "express";
const userRounter = express.Router();
const handleEditUser = (req,res)=>res.send("Users!");
userRounter.get("/edit",handleEditUser);

export default userRounter;