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
            const user = await User.find({email : email})
    }
    }

    catch(error){
        res.status(400).json({
            message: `Something went wrong :/ ${error}`,
          });
    }
}