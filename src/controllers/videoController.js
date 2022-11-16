import Video from "../models/Video";

export const home = async(req,res)=>{
  try{
    console.log("i Started");
    const videos = await Video.find({});
    console.log(videos)
    console.log("i finish")
    
    return res.render('home',{pageTitle:"HOME",videos});
  }catch(err){
    return res.render("Server-error",err);
  }
 
};

export const watch = async(req,res) => {
  const {id} = req.params;
  const video = await Video.findById(id);
  if(!video){
    return res.render('404',{pageTitle:"Video not found."});
  }
  
  return res.render('watch',{pageTitle:video.title,video});

};

export const getEdit = async(req,res) => {
  const {id} = req.params;
  const video = await Video.findById(id);
  //console.log(id);
  if (!video){
  return res.render("404",{pageTitle:"Video not found."});  
  }
  res.render("edit",{pageTitle:`Editing ${video.title}`,video});
};

export const postEdit = async(req,res)=>{
  const {id} = req.params;
  const video = await Video.findById(id);
  const {title,description,hashtags} = req.body;

  if (!video){
    return res.render("404",{pageTitle:"Video not found."});  
  }
  video.title = title;
  video.description = description;
  video.hashtags = hashtags.split(",").map((word)=> word.startsWith("#") ?  word : `#${word}`);
  await video.save();
  return res.redirect(`/videos/${id}`);
};

export const search = (req,res) => res.send("Search!");
export const deleteVideo = (req,res) => res.send("deleteVideo");

//비디오 업로드
export const getUpload = (req,res)=>{
  return res.render('upload',{pageTitle:"Upload Video!"});
}

export const postUpload = async(req,res)=>{
  const {title, description, hashtags} = req.body;
  try{
  // here we will add a video to the videos array

  await Video.create({
    title,
    description,
    /*createdAt: Date.now(), 스키마에 디폴드로 작성하였기 때문에*/
    hashtags: hashtags.split(",").map((word)=>`#${word}`),
    
  });
 
  return res.redirect("/");
}catch(err){
 //console.log('에러발생',err);
  return res.render("upload",{oageTitle:"upload Video",errorMessage: err._message});
  
}

}
