import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

export default bcryptHandler = (
  password,
  userPassword,
  cred,
  requestedUser
) => {
  bcrypt.hash(password, 10, function (err, hash) {
    bcrypt.compare(password, userPassword, function (err, result) {
      if (err) {
        return res.status(400).json({ message: err });
      } else {
        const jwt = sign(cred, process.env.JWT_KEY, {
          expiresIn: "24h",
        });
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("jwt", jwt, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60,
            path: "/",
          })
        );

        return res.status(200).json({ user: requestedUser.username });
      }
    });
  });
};
