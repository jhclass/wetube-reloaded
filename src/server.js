// 
import express from "express";
import morgan from "morgan";
import session from "express-session";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRounter from "./routers/userRouter";



const app = express();
const logger = morgan("dev");
app.disable('x-powered-by');
app.set('view engine','pug');
app.set('views', process.cwd()+"/src/views");
app.use(logger);
app.use(express.urlencoded({extended:true}));
app.use(
    session({
        secret:"hello!",
        resave:true,
        saveUninitialized:true,
    })
);
//쿠키를 제대로 요구req 하는지
// app.use((req,res,next)=>{
//     console.log(req.headers);
//     next();
// });
app.use("/",rootRouter);
app.use("/videos",videoRouter);
app.use("/users",userRounter);

export default app;





