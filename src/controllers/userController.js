import User from "../models/User";

export const getJoin = (req,res) => {
    return res.render("join",{pageTitle:"Join"});
}
export const postJoin = async (req,res) => {
    console.log(req.body);
    const {name, username, email, password, password2, location} = req.body;
    const pageTitle = "join"
    if(password !== password2) {
        return res.status(400).render("join",{
            pageTitle,
            errorMessage:"비밀번호가 서로 일치하지 않습니다."
        });
    }

   const usernameExists = await User.exists({username});
   if (usernameExists){
    return res.status(400).render("join",{
        pageTitle,
        errorMessage:"지금 사용중인 아이디는 사용할 수 없습니다."
    }); 
   }
   const useremailExists = await User.exists({email});
   if (useremailExists){
    return res.status(400).render("join",{
        pageTitle,
        errorMessage:"지금 사용중인 이메일은 사용할 수 없습니다."
    }); 
   }
  
   try {
    await User.create({
        name, 
        username, 
        email, 
        password, 
        location
       });
   } catch(err){
    //console.log('에러발생',err);
      return res.render("join",{
        pageTitle:"Join",
        errorMessage: err._message
        });
      
    }
   return res.redirect('/login');

}

export const edit = (req,res) => res.send("EditUser");

export const remove = (req,res) => res.send("Remove User!");

export const login = (req,res) => res.send("Login");

export const logout = (req,res) => res.send("logout");

export const see = (req,res) => res.send("see");