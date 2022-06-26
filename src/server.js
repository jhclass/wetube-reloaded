//
import express from "express";
const app = express();

const port = 4000;

const globalRouter = express.Router();
const handleHome = (req,res)=>res.send("Home");
globalRouter.get("/",handleHome);
const userRounter = express.Router();
const handleEditUser = (req,res)=>res.send("Users!");
userRounter.get("/edit",handleEditUser);
const videoRouter = express.Router();
const handleWatchVideo = (req,res)=>res.send("videos!");
videoRouter.get("/watch",handleWatchVideo);

app.use("/",globalRouter);
app.use("/videos",videoRouter);
app.use("/users",userRounter);







const eventHandler = ()=>console.log(`Your port Number ${port}`);
app.listen(port,eventHandler);



