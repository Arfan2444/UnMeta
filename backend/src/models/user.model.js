import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    clerkId:{
        type:String,
        required:true,
        unqiue:true
    },
    email:{
        type:String,
        required:true,
        unqiue:true
    },
    fullName:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
        default:""
    }
},
{ timestamps: true} // createdAt updatedAt
);

const User = mongoose.model("User",userSchema)
export default User;