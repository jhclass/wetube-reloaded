let videos = [
  {
    title:"video #1",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views:59,
    id:1
  },
  {
    title:"video #2",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views:1,
    id:2
  },
  {
    title:"video #3",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views:59,
    id:3
  }
 
];

export const trending = (req,res)=>{
  
  res.render('home',{pageTitle:"HOME",videos});
};

export const watch = (req,res) => {
  
  const {id} = req.params;
  const video = videos[id-1];

  res.render('watch',{pageTitle:`Watch ${video.title}`,video});
}

export const getEdit = (req,res) => {
  
  const {id} = req.params;
  const video = videos[id-1];
  //console.log(id);
  res.render("edit",{pageTitle:`Editing ${video.title}`,video});

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

export const postUpload = (req,res)=>{
  
  // here we will add a video to the videos array
  const {title} = req.body;
  const newVideo = {
    title, //title:title
    rating: 5,
    comments: 2,
    createdAt: "Just now",
    views:59,
    id:videos.length+1
  }
  videos.push(newVideo);
  console.log(req.body)
  return res.redirect("/");
}
