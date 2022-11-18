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
  const {title,description,hashtags} = req.body;
  const video = await Video.exists({_id:id});
  if (!video){
    return res.render("404",{pageTitle:"Video not found."});  
  }
  await Video.findByIdAndUpdate(id,{
    title,description,hashtags:Video.formatHashtags(hashtags)
  });
  
  // await video.save(); 이거 때문에 304 뜨네
  return res.redirect(`/videos/${id}`);
};

export const search = (req,res) => res.send("Search!");
//비디오삭제
export const deleteVideo = async (req,res) => {
  const {id} = req.params;
  await Video.findByIdAndDelete(id);
  console.log(id);
  //delete video
  return res.redirect("/");
}

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
    hashtags:Video.formatHashtags(hashtags)
    
  });
 
  return res.redirect("/");
  }catch(err){
  //console.log('에러발생',err);
    return res.render("upload",{oageTitle:"upload Video",errorMessage: err._message});
    
  }

}
