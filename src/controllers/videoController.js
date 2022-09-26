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

export const edit = (req,res) => res.render("Edit");

export const search = (req,res) => res.send("Search!");

export const upload = (req,res) => res.send("Upload");

export const deleteVideo = (req,res) => res.send("deleteVideo");


