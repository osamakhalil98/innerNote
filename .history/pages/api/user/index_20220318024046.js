import dbConnect from "../../../middleware/database";
import User from "../../../models/User";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import cookie from "cookie";
import { verify } from "jsonwebtoken";

export default async function userHandler(req, res) {
  dbConnect();
  const maxAge = 3 * 24 * 60 * 60;
  const { method } = req;

  switch (method) {
    case "GET":
      verify(
        !req.cookies.jwt,
        process.env.JWT_KEY,
        async function (err, decoded) {
          if (!err && decoded) {
          } else {
            res.status(401).json({ message: "This user not auth" });
          }
        }
      );

      try {
        const requestedUser = await User.findOne({ email: email });

        const cred = { sub: requestedUser._id, userMail: requestedUser.email };

        const jwt = sign(cred, process.env.JWT_KEY, { expiresIn: "24h" });
        // setting the cookie
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("jwt", jwt, {
            httpOnly: true,
          })
        );
        res.status(200).json({ user: requestedUser.username });
        return;
      } catch (e) {
        res.status(400).json({ success: false, message: e.message });
        return;
      }

    default:
      return;
  }
}
