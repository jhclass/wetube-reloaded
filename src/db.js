import mongoose, { mongo } from "mongoose";

mongoose.connect("mongodb://localhost:27017/jintube");

const db = mongoose.connection;
const handleOpen = ()=>console.log("connected to DB");
db.on("error", (error)=> console.log("DB Error",error));
db.once("open",handleOpen);
