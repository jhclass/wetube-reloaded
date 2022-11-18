import express from "express";
import { watch,getEdit,postEdit,deleteVideo,getUpload,postUpload } from "../controllers/videoController";
const videoRouter = express.Router();
// const handleWatchVideo = (req,res)=>res.send("videos!");
// const handleEdit = (req,res)=>res.send("EditVideos!");

videoRouter.get("/:id([0-9a-f]{24})",watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit); //축약
videoRouter.route("/:id([0-9a-f]{24})/delete").get(deleteVideo)
videoRouter.route("/upload").get(getUpload).post(postUpload);


export default videoRouter;