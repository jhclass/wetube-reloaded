import express from "express";
import {join} from "../controllers/userController";
import {trending} from "../controllers/videoController";
const globalRouter = express.Router();
// const handleHome = (req,res)=>res.send("Home");
// const handlejoin = (req,res)=>res.send("join!");
globalRouter.get("/",trending);
globalRouter.get("/join",join);

export default globalRouter;