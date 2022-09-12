export const trending = (req,res)=>res.send("homepage videos!");

export const see = (req,res) =>{
  console.log(req.params);
  return res.send(`현재 보고 있는 비디오는 #${req.params.id}`);
};

export const edit = (req,res) => {
  console.log(req.params);
  res.send("Edit");
};

export const search = (req,res) => res.send("Search!");

export const upload = (req,res) => res.send("Upload");

export const deleteVideo = (req,res) => {
  console.log(req.params);
    res.send("deleteVideo");
};

