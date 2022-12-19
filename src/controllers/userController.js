import User from "../models/User";
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
    console.log(tokenRequest);
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
        console.log(userData);
        const emailData = await (
            await fetch(`${apiUrl}/user/emails`,{
                headers: {
                    Authorization:`token ${access_token}`,
                },
            })
        ).json();
        console.log(emailData);
        const emailObj = emailData.find(
            (email)=>email.primary === true && email.verified === true
        );
        console.log('조건을 만족하는 email0',emailObj);
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
            user:{_id},
            },
            body : { name, email, username, location },
        } = req;
  
    const useremailExists = await User.exists({email});
    if (useremailExists){
        return res.status(400).render("edit-profile",{
        
            errorMessage:"지금 작성한 이메일은 사용할수 없습니다."
        }); 
    }
    const updateUser = await User.findByIdAndUpdate(_id,{
        name,email,username,location
    },{new:true});
     
    req.session.user = updateUser;
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
    return res.render("./users/change-password",{pageTitle:"Change Password"});
}
export const postChangePassword = (req,res) => {
    //send notification
    return res.redirect("/");
}
export const see = (req,res) => res.send("see");