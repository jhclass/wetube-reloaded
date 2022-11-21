import "./db";
import "./models/Video";
import "./models/User";
import app from "./server";


const port = 4000;
const eventHandler = ()=>console.log(`Your port Number ${port}`);
app.listen(port,eventHandler);
