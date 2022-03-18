import dbConnect from "../../../middleware/database";
import User from "../../../models/User";
import bcryptHandler from "../../../middleware/bcryptHandler";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import cookie from "cookie";

export default async function userSignInHandler(req, res) {
  dbConnect();
  const maxAge = 3 * 24 * 60 * 60;
  const { email, password } = req.body;
  const { method } = req;

  switch (method) {
    case "POST":
      // check if the user already exist or not
      try {
        const requestedUser = await User.findOne({ email: email });
        console.log("The user", requestedUser);
        if (!requestedUser) {
          return res.status(400).json({ message: "This User Doesn't Exist" });
        } else {
          const userPassword = await requestedUser.password;
          const cred = {
            sub: requestedUser._id,
            userMail: requestedUser.email,
          };

          return new Promise((resolve, reject) => {
            bcryptHandler(password, userPassword);
          });
        }
      } catch (e) {
        return res.status(400).json({ success: false, message: e.message });
      }

    default:
      return res.status(400).json({ message: "This User Doesn't Exist" });
  }
}
