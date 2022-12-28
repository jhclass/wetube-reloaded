import mongoose, { mongo } from "mongoose";
//console.log(process.env.COOKIE_SECRET,process.env.DB_URL); //출력됨!ㅎㅎ
mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
const handleOpen = ()=>console.log("connected to DB");
db.on("error", (error)=> console.log("DB Error",error));
db.once("open",handleOpen);
