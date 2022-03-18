import dbConnect from "../../../middleware/database";
import User from "../../../models/User";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import cookie from "cookie";
import { getCookie } from "cookies-next";
import { verify } from "jsonwebtoken";

export default async function userHandler(req, res) {
  dbConnect();
  const maxAge = 3 * 24 * 60 * 60;
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        verify(
          getCookie("jwt", { req, res }),
          process.env.JWT_KEY,
          async function (err, decoded) {
            console.log(req.cookies.jwt);
            if (!err) {
              res.status(200).json({ message: "This user authenticated" });
            } else {
              res.status(401).json({ message: "This user not auth" });
            }
          }
        );
      } catch (e) {
        res.status(400).json({ success: false, message: e.message });
        return;
      }

    default:
      return;
  }
}
