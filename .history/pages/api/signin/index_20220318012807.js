import dbConnect from "../../../middleware/database";
import User from "../../../models/User";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { setCookies } from "cookies-next";

export default async function userSignInHandler(req, res) {
  dbConnect();
  const maxAge = 3 * 24 * 60 * 60;
  const { email, password } = req.body;
  const { method } = req;

  switch (method) {
    case "POST":
      // check if the user already exist or not
      const userEmail = await User.findOne({ email: email });
      if (!userEmail) {
        res.status(404).json({
          success: false,
          message: "This user doesn't exist",
        });
        return;
      }

      try {
        const requestedUser = await User.findOne({ email: email });

        const userPassword = await requestedUser.password;
        const cred = { sub: requestedUser._id, userMail: requestedUser.email };

        bcrypt.hash(password, 10, function (err, hash) {
          bcrypt.compare(password, userPassword, function (err, result) {
            if (err) {
              res.status(400).json({ message: err });
              return;
            } else {
              const jwt = sign(cred, process.env.JWT_KEY, { expiresIn: "24h" });
              setCookies("jwt", jwt, {
                req,
                res,
                maxAge: maxAge,
                httpOnly: true,
              });
              res.status(200).json({ user: requestedUser.username });
              return;
            }
          });
        });
      } catch (e) {
        res.status(400).json({ success: false, message: e.message });
        return;
      }

      break;

    default:
      return;
  }
}
