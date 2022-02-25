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
            const userEmail = await User.find({email : email});
            if(userEmail){
                    res.status(200).json({
                        message:"This user already exist"
                    })
            }

            else{
                    try{
                        const user = await User.create({
                            username,
                            email,
                            password
                        })
                    }
                    catch(e){

                    }
            }
    }
    }

    catch(error){
        res.status(400).json({
            message: `Something went wrong :/ ${error}`,
          });
    }
}