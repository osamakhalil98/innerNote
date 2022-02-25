const mongoose = require("mongoose");
import bcrypt from "bcrypt"

const UserSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true,
        unique:true,
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
        trim:true,
        lowercase:true,
        minlength:8,
        maxlength:200
    }
})

UserSchema.pre("save", function(next){
bcrypt.hash(this.password, 10, (err, hash) => {
    this.password = hash;
    next();
})
})

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
