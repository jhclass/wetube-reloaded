import express from "express";
import {join,login} from "../controllers/userController";
import {home,search} from "../controllers/videoController";
const globalRouter = express.Router();
// const handleHome = (req,res)=>res.send("Home");
// const handlejoin = (req,res)=>res.send("join!");
globalRouter.get("/",home);
globalRouter.get("/join",join);
globalRouter.get("/login",login);
globalRouter.get("/search",search);

export default globalRouter;