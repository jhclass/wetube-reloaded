import express from "express";
import { watch,edit } from "../controllers/videoController";
const videoRouter = express.Router();
// const handleWatchVideo = (req,res)=>res.send("videos!");
// const handleEdit = (req,res)=>res.send("EditVideos!");
videoRouter.get("/watch",watch);
videoRouter.get("/edit",edit)

export default videoRouter;