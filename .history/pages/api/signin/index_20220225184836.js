import dbConnect from "../../../middleware/database";
import User from "../../../models/User";
import {compare} from "bcrypt";

export default async function userHandler(req,res){
    dbConnect();
    
    const {username, email, password} = req.body;
    const{method} = req;

    try{

    switch(method){
        case "POST":
            // check if the user already exist or not
            const userEmail = await User.findOne({$or: [{email : email}, {username:username}]});
            if(userEmail){
                    res.status(400).json({
                        success:false,
                        message:"This user already exist"
                    })
            }

            else{
                    try{
                        hash(password, 10 , async function (err, hash) {
                            const user = await User.create({
                                username,
                                email,
                                password:hash
                            });
                            res.status(201).json({success:true, data:user})
                        })
                        
                    }
                    catch(e){
                        res.status(400).json({ success: false, message:e.message });
                    }
            }
            break;

            case "GET":
                try{
                    console.log("ONLY POST AVAILABLE")
                }
               catch(e){
                   res.status(400)
               }
                break;
            default:
              res.status(400).json({ error: error, message:"ONLY POST AVAILABLE" });
              
              break;
    }
    

    }

    catch(error){
        res.status(400).json({
            message: `Something went wrong :/ ${error}`,
          });
    }
}