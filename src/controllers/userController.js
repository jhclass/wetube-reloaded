import User from "../models/User";
import Video from "../models/Video";
import fetch from "node-fetch";
import bcrypt from "bcrypt";


export const getJoin = (req,res) => {
    return res.render("join",{pageTitle:"Join"});
}
export const postJoin = async (req,res) => {
    //console.log(req.body);
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
        errorMessage:"입력하신 아이디는 사용할 수 없습니다."
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

export const startGithubLogin = (req,res) => {
    //https://github.com/login/oauth/authorize?client_id=24ed007013090a3ca5b3&allow_signup=false&scope=user:email
    const baseUrl = `https://github.com/login/oauth/authorize`;
    const config = {
        client_id: process.env.GH_CLIENT,
        allow_signup: false,
        scope:"read:user user:email"
    }
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`; 
    return res.redirect(finalUrl);
}

export const finishGithubLogin = async (req,res) => {
    const baseUrl = `https://github.com/login/oauth/access_token`;
    const config = {
        client_id: process.env.GH_CLIENT,
        client_secret: process.env.GH_SECRET,
        code: req.query.code

    }
    //console.log(config)
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    
    const tokenRequest = await(
        await fetch(finalUrl,{
            method:"POST",
            headers:{
                Accept:"application/json",
            },
        })
    ).json();
    //const json = await data.json();
    //console.log(tokenRequest);
    //res.send(JSON.stringify(json));
    if("access_token" in tokenRequest){
        //access api
        const { access_token } = tokenRequest;
        const apiUrl = "https://api.github.com";
        const userData = await(
            await fetch(`${apiUrl}/user`,{
                headers: {
                    Authorization:`token ${access_token}`,
                },
            })
        ).json();
        //console.log(userData);
        const emailData = await (
            await fetch(`${apiUrl}/user/emails`,{
                headers: {
                    Authorization:`token ${access_token}`,
                },
            })
        ).json();
        //console.log(emailData);
        const emailObj = emailData.find(
            (email)=>email.primary === true && email.verified === true
        );
        //console.log('조건을 만족하는 email0',emailObj);
        if(!emailObj){
            return res.redirect("/login");
        }
        let user = await User.findOne({email: emailObj.email});
        if(!user){
        
          //  계정생성
          //console.log('계정을 생성합니다.');
          const user = await User.create({
            avatarUrl: userData.avatar_url,
            name:userData.name,
            username:userData.login,
            email:emailObj.email,
            password:"",
            socialOnly:true,
            location:userData.location,
          });
       
        }
        req.session.loggedIn = true; //loggedIn 이 true 로 바뀌고
        req.session.user = user; //user에는 User 에 서 가저온 user 정보를 담아
        return res.redirect("/");
    }else{
        return res.redirect("/login");
    }
}

export const edit = (req,res) => res.send("EditUser");

export const remove = (req,res) => res.send("Remove User!");

//로그인페이지
export const getLogin = (req,res) => {
    return res.render("login",{pageTitle:"Login"});
}
export const postLogin = async (req,res)=>{
    const pageTitle="Log in";
    const {username,password} = req.body;
    //계정이 존재하는지 체크
    const user = await User.findOne({username});
    if(!user){
        return res.status(400).render("login",{
            pageTitle,
            errorMessage: "아이디를 다시 확인하여주세요."
        });
    }
    
    //패스워드가 일치하는지 체크
    const ok = await bcrypt.compare(password,user.password);
    if(!ok){
        return res.status(400).render("login",{
            pageTitle,
            errorMessage: "비밀번호를 다시 확인하여주세요."
        });
    }
    req.session.loggedIn = true; //loggedIn 이 true 로 바뀌고
    req.session.user = user; //user에는 User 에 서 가저온 user 정보를 담아
    return res.redirect("/");
}
export const logout = (req,res) => {
    req.session.destroy();
    return res.redirect('/');
}
//User Profile 수정.
export const getEdit = (req,res)=>{
    return res.render("edit-profile",{pageTitle:"Edit Profile"});
}
export const postEdit = async (req,res) => {
    const {session:{
            user:{_id, avatarUrl},
            },
            body : { name, email, username, location },file
           
        } = req;
        console.log(file);
    
    const useremailExists = await User.exists({email});
    if (useremailExists){
        return res.status(400).render("edit-profile",{
        
            errorMessage:"지금 작성한 이메일은 사용할수 없습니다."
        }); 
    }
    const updateUser = await User.findByIdAndUpdate(_id,{
        avatarUrl:file ? file.path : avatarUrl,
        name,
        email,
        username,
        location
    },
    {new:true});
     
    req.session.user = updateUser;
    //console.log(req.session.user);
    //업데이트가 되지 않는다. 왜? DB에는 적용이 되었으나, 현재 session 이 업데이트 되지 않았으므로
    // 방법 1.
    // req.session.user = {
    //     ...req.session.user,
    //     name,
    //     email,
    //     username,
    //     location,
    // }
    // 방법2.
    
    return res.redirect("/users/edit");
}
export const getChangePassword = (req,res) => {
    // if(req.session.user.socialOnly===true){ // sns 로그인을 했을 경우 비밀번호 변경을 못하게 한다.
    //     return res.redirect("/");
    // }
    return res.render("./users/change-password",{pageTitle:"Change Password"});
}
export const postChangePassword = async (req,res) => {
    //send notification
    const {session:{
        user:{_id},
        },
        body : { oldPassword, newPassword, newPasswordConfirmation },
    } = req;
    //이전비밀번호 && 이전비밀번호 비교 1)
    const user = await User.findById(_id);
    const ok = await bcrypt.compare(oldPassword,user.password);
    if(!ok){ //같지 않다? 2)
        return res.status(400).render("users/change-password",{
            pageTitle:"Change Password",
            errorMessage: "The current password is incorrect" //제대로 변경한게 맞네! 3)
        })
    }
    if(newPassword !== newPasswordConfirmation) {
    
        return res.status(400).render("users/change-password",{
            pageTitle:"Change Password",
            errorMessage: "The password does not match the confirmation"
        })
    }
    
    //console.log("Old password", user.password);
    user.password = newPassword;
    //console.log("New unhash",user.password);
    await user.save();
    //console.log("hashed",user.password);
    
    return res.redirect("/users/logout");
    
}
export const see = async(req,res) => {
   // console.log(req.params);
    const {id} = req.params;
    const user = await User.findById(id);
    if(!user){ //사용자가 아니면 404 err 때리고
        return res.status(404).render("404",{pageTitle:"User not found"});
    }
    const videos = await Video.find({owner:user._id}); // 비디오 모델에서 유저 의 _id 를 가져와서
    console.log(videos);
    return res.render("./users/profile",{pageTitle:`${user.name}의 Profile`,user,videos});

    
}