import express from "express";
import {getJoin ,login, postJoin} from "../controllers/userController";
import {home,search} from "../controllers/videoController";
const rootRouter = express.Router();
// const handleHome = (req,res)=>res.send("Home");
// const handlejoin = (req,res)=>res.send("join!");
rootRouter.get("/",home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.get("/login",login);
rootRouter.get("/search",search);


export default rootRouter;