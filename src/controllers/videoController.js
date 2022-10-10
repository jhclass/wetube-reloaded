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

export const watch = (req,res) => {
  const {id} = req.params;
  res.render('watch',{pageTitle:`Watch`});
}

export const getEdit = (req,res) => {
  const {id} = req.params;
  //console.log(id);
  res.render("edit",{pageTitle:`Editing`});
};

export const postEdit = (req,res)=>{
  const {id} = req.params;
  console.log(req.body.title);
  const {title} = req.body;
  videos[id-1].title=title;
  return res.redirect(`/videos/${id}`);
};

export const search = (req,res) => res.send("Search!");
export const deleteVideo = (req,res) => res.send("deleteVideo");

//비디오 업로드
export const getUpload = (req,res)=>{
  return res.render('upload',{pageTitle:"Upload Video!"});
}

export const postUpload = async(req,res)=>{
  // here we will add a video to the videos array
  const {title, description, hashtags} = req.body;
  await Video.create({
    title,
    description,
    createAt: Date.now(),
    hashtags: hashtags.split(",").map((word)=>`#${word}`),
    meta: {
      views: 0,
      rating: 0,
    },
  });
 
  return res.redirect("/");
}
