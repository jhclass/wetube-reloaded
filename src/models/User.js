import bcrypt from "bcrypt";
import mongoose from "mongoose";
//여러개의 조건을 한거번에 사용할꺼면  $or 을 사용하는것도 괜찮다.
//하지만 지금 각각의 unipue 를 검증하고 에러메세지를 보낼 예정.
const userSchema = new mongoose.Schema({
    email:{type:String, required:true, unique:true},
    username:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    name:{type:String, required:true},
    location:String,
});

userSchema.pre("save",async function(){
    console.log("Users password:", this.password);
    this.password = await bcrypt.hash(this.password, 5);
    console.log("Hashed password", this.password);
});


const User = mongoose.model("User",userSchema);
export default User;


