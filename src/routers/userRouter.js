import express from "express";
import { remove,edit,logout,see,startGithubLogin, finishGithubLogin } from "../controllers/userController";
const userRounter = express.Router();
//const handleEdit = (req,res)=>res.send("Edit Users!");
//const handleDelete = (req,res)=>res.send("Delete Users!");
// use(/user) 라는 것을 기억하자  경로는 /users/github/start 가 되는것 
userRounter.get("/logout",logout);
userRounter.get("/edit",edit);
userRounter.get("/remove",remove);
userRounter.get("/github/start", startGithubLogin);//가장아래로 내려도 순서는 의미없음.!
userRounter.get("/github/finish", finishGithubLogin);

userRounter.get(":id",see);



export default userRounter;