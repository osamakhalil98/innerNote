import dbConnect from "../../../middleware/database";
import User from "../../../models/User";
import bcryptHandler from "../../../middleware/bcryptHandler";

export default async function userSignInHandler(req, res) {
  dbConnect();

  const { email, password } = req.body;
  const { method } = req;

  switch (method) {
    case "POST":
      // check if the user already exist or not

      const requestedUser = await User.findOne({ email: email });
      // console.log("The user", requestedUser);
      if (!requestedUser) {
        return res.status(400).json({ message: "This User Doesn't Exist" });
      }

      const userPassword = await requestedUser.password;
      const cred = {
        sub: requestedUser._id,
        userMail: requestedUser.email,
      };

      return bcryptHandler(password, userPassword, cred, requestedUser, res);

    default:
      return res.status(400).json({ message: "This User Doesn't Exist" });
  }
}
