import dbConnect from "../../../middleware/database";
import User from "../../../models/User";
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
      try {
        const requestedUser = await User.findOne({ email: email });
        return res.status(200).json(await requestedUser);
        console.Console(res);
      } catch (e) {
        res.status(400).json({ success: false, message: e.message });
        return;
      }

    // check if the user already exist or not
    /*   try {
        const requestedUser = await User.findOne({ email: email });
        console.log("The user", requestedUser);
        if (!requestedUser) {
          res.status(400).json({ message: "This User Doesn't Exist" });
          return;
        } else {
          const userPassword = await requestedUser.password;
          const cred = {
            sub: requestedUser._id,
            userMail: requestedUser.email,
          };

          return new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, function (err, hash) {
              bcrypt.compare(password, userPassword, function (err, result) {
                if (err) {
                  res.status(400).json({ message: err });
                  reject();
                  return;
                } else {
                  const jwt = sign(cred, process.env.JWT_KEY, {
                    expiresIn: "24h",
                  });
                  res.setHeader(
                    "Set-Cookie",

                    cookie.serialize("jwt", jwt, {
                      httpOnly: true,

                      maxAge: maxAge,
                      path: "/",
                    })
                  );
                  res.status(200).json({ user: requestedUser.username });
                  resolve();
                  return;
                }
              });
            });
          });
        }
      } catch (e) {
        res.status(400).json({ success: false, message: e.message });
        return;
      }
*/
    default:
      res.status(400).json({ message: "This User Doesn't Exist" });
      return;
  }
}
