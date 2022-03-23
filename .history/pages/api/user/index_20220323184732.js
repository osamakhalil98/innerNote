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
  const { id } = req.query;

  switch (method) {
    case "GET":
      try {
        const user = await User.findById(id);

        if (!user) {
          res
            .status(404)
            .json({ success: false, message: "This User Doesn't exist" });
        }
        res.status(200).json({ success: true, data: User });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: "something went wrong",
          error: error,
        });
      }

    default:
      return;
  }
}
