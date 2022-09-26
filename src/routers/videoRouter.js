import express from "express";
import { watch,edit,upload,deleteVideo } from "../controllers/videoController";
const videoRouter = express.Router();
// const handleWatchVideo = (req,res)=>res.send("videos!");
// const handleEdit = (req,res)=>res.send("EditVideos!");
videoRouter.get("/upload",upload);
videoRouter.get("/:id(\\d+)",watch);
videoRouter.get("/:id(\\d+)/edit",edit);
videoRouter.get("/:id(\\d+)/delete",deleteVideo);

export default videoRouter;