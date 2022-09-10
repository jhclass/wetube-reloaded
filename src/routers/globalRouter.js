import express from "express";
import {join,login} from "../controllers/userController";
import {trending,search} from "../controllers/videoController";
const globalRouter = express.Router();
// const handleHome = (req,res)=>res.send("Home");
// const handlejoin = (req,res)=>res.send("join!");
globalRouter.get("/",trending);
globalRouter.get("/join",join);
globalRouter.get("/login",login);
globalRouter.get("/search",search);

export default globalRouter;