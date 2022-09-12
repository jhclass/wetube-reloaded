// 
import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRounter from "./routers/userRouter";

const port = 4000;
const app = express();
const logger = morgan("dev");
app.disable('x-powered-by');
app.set('view engine','pug');
app.set('views', process.cwd()+"/src/views");
app.use(logger);

app.use("/",globalRouter);
app.use("/videos",videoRouter);
app.use("/users",userRounter);

const eventHandler = ()=>console.log(`Your port Number ${port}`);
app.listen(port,eventHandler);



