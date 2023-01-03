import User from "../models/User";
import Video from "../models/Video";

export const home = async(req,res)=>{
  try{
   // console.log("i Started");
    const videos = await Video.find({}).sort({createdAt:"desc"});
   // console.log('aa',videos)
   // console.log("i finish")
    
    return res.render('home',{pageTitle:"HOME",videos});
  }catch(err){
    return res.status(400).render("Server-error",err);
  }
 
};

export const watch = async(req,res) => {
  const {id} = req.params;
  const video = await Video.findById(id).populate("owner");
  console.log(video);
  if(!video){
    return res.stauts(404).render('404',{pageTitle:"Video not found."});
  }
  //console.log(video);
  return res.render('watch',{pageTitle:video.title,video}); //해당아이디에 맞는 비디오정보를 보내줌.
 
};

export const getEdit = async(req,res) => {
  const {id} = req.params;
  const video = await Video.findById(id);
  //console.log(id);
  if (!video){
  return res.status(404).render("404",{pageTitle:"Video not found."});  
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
  
  return res.redirect(`/videos/${id}`);
};

//비디오검색
export const search = async (req,res) => {
  const {keyword} = req.query;
  console.log("should search for", keyword);
  let videos = [];
  if(keyword){
    videos = await Video.find({
      title: {
        $regex: new RegExp(keyword,"i"),
      },
    });
  }
 return res.render("search",{pageTitle:"search",videos});
}

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
  //const file=req.file;
  const {
    user:{_id}
  } = req.session;
  const {path:fileUrl}=req.file;
  //console.log(fileUrl);
  const {title, description, hashtags} = req.body;
  try{
  // here we will add a video to the videos array

  await Video.create({
    title,
    description,
    fileUrl,
    owner:_id,
    /*createdAt: Date.now(), 스키마에 디폴드로 작성하였기 때문에*/
    hashtags:Video.formatHashtags(hashtags)
    
  });
  
  return res.redirect("/");
  }catch(err){
  //console.log('에러발생',err);
    return res.render("upload",{
      pageTitle:"upload Video",errorMessage: err._message
    });
    
  }

}
