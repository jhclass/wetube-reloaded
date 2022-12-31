import express from "express";
import { remove,getEdit,postEdit,logout,see,startGithubLogin, finishGithubLogin, getChangePassword, postChangePassword } from "../controllers/userController";
import { protectorMiddleware, publicOnlyMiddleware, uploadFiles } from "../middlewares";
const userRouter = express.Router();
//const handleEdit = (req,res)=>res.send("Edit Users!");
//const handleDelete = (req,res)=>res.send("Delete Users!");
// use(/user) 라는 것을 기억하자  경로는 /users/github/start 가 되는것 
userRouter.get("/logout",protectorMiddleware,logout);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(uploadFiles.single("avatar"), postEdit);
userRouter.route("/change-password").all(protectorMiddleware).get(getChangePassword).post(postChangePassword);
userRouter.get("/remove",remove);
userRouter.get("/github/start",publicOnlyMiddleware, startGithubLogin);//가장아래로 내려도 순서는 의미없음.!
userRouter.get("/github/finish",publicOnlyMiddleware, finishGithubLogin);
userRouter.get("/:id",see);



export default userRouter;