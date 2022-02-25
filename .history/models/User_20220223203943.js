const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        maxlength:100,
        minlength:3,
        lowercase:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minlength:8,
        maxlength:30
    }
})


module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
