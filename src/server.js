// 
import express from "express";
import morgan from "morgan";
import session from "express-session";
import { localsMiddleware } from "./middlewares";
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
app.use( //세션선언
    session({
        secret:"hello!",
        resave:true,
        saveUninitialized:true,
    })
);
app.use((req,res,next)=>{ //세션스토어에 담겨있는 내용을 console.log
    req.sessionStore.all((error,sessions)=>{
        console.log(sessions);
        
    });
    next();
});
app.get("/add-one",(req,res,next)=>{ 
    res.locals.sexy = "you";
    // add-one 페이지에 세션아이디와 세션안에 생성한 포테이토에 +=1 하여 브라우저마다 세션이 다르게 적용되고 있다는 것을 확인
    req.session.potato += 1;
    return res.send(`${req.session.id}\n${req.session.potato}`);
});

//쿠키를 제대로 요구req 하는지
// app.use((req,res,next)=>{
//     console.log(req.headers);
//     next();
// });
app.use(localsMiddleware);
app.use("/",rootRouter);
app.use("/videos",videoRouter);
app.use("/users",userRounter);

export default app;





