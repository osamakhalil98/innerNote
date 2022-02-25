import dbConnect from "../../../middleware/database";
import User from "../../../models/User";

export default async function userHandler(req,res){
    dbConnect();
    
    const {username, email, password} = req.body;
    const{method} = req;

    try{

    switch(method){
        case "POST":
            // check if the user already exist or not
            const userEmail = await User.findOne({email : email}, {username : username}});
            if(userEmail){
                    res.status(400).json({
                        success:false,
                        message:"This user already exist"
                    })
            }

            else{
                    try{
                        const user = await User.create({
                            username,
                            email,
                            password
                        });
                        res.status(201).json({success:true, data:user})
                    }
                    catch(e){
                        res.status(400).json({ success: false, message:e.message });
                    }
            }
            break;

            default:
              res.status(400).json({ error: error }, "This is the errror lololo");
              break;
    }
    }

    catch(error){
        res.status(400).json({
            message: `Something went wrong :/ ${error}`,
          });
    }
}