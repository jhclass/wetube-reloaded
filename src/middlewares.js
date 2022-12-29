import multer from "multer";

export const localsMiddleware = (req,res,next)=>{
   
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName = "Wetube";
    res.locals.loggedInUser = req.session.user || {};
    //console.log("loggedInUser",req.session.user);
    next();

}

export const protectorMiddleware = (req,res,next)=> {
    if(req.session.loggedIn){
        return next();
    }else{
        return res.redirect("/login");
    }
}

export const publicOnlyMiddleware = (req,res,next) => {
    if(!req.session.loggedIn){
        return next();
    }else{
        return res.redirect('/');
    }
}
 //file 전송 ! (feat. Multer)
export const uploadFiles = multer({dest:"upload/avatars/",limits:{
    fileSize:3000000, //3m
}});
export const uploadVideos = multer({dest:"upload/videos/",limits:{
    fileSize:10000000, //10mb
}});