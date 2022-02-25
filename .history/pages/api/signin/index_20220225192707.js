import dbConnect from "../../../middleware/database";
import User from "../../../models/User";
import bcrypt from "bcrypt";


export default async function userHandler(req,res){
    dbConnect();
    
    const {email, password} = req.body;
    const{method} = req;

    try{

    switch(method){
        case "POST":
            // check if the user already exist or not
            const userEmail = await User.findOne({email : email});
            if(!userEmail){
                    res.status(400).json({
                        success:false,
                        message:"This user doesn't exist"
                    })
            }

            else{
                    try{
                        const requestedUser = await User.findOne({email : email});
                      
                        const userPassword = await requestedUser.password;
                        bcrypt.hash(password, 10, function(err, hash) {
                            if (err) { throw (err); }
                            bcrypt.compare(password, userPassword, function(err, result) {
                                if (err) { throw (err); }
                                else{
                                    res.json({message:"OK"})
                                }
                            });
                        });
                            
                            
                        
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