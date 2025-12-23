import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
        username:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
             type:String,
            required:true,
            
        },
        status:{
            type:String,
            default:"active"
        },
          fromInactive: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "inactiveusers",
        required: false
    },
        role:{
            type:String,
            default:"normalUser"
        }
})

 const activeusers=mongoose.model("activeusers",UserSchema)

 export default activeusers;