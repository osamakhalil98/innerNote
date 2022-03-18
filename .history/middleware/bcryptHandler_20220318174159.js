import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import cookie from "cookie";

export default async function bcryptHandler(
  password,
  userPassword,
  cred,
  requestedUser,
  res
) {
  const maxAge = 3 * 24 * 60 * 60;
  bcrypt.hash(password, 10, function (err, hash) {
    bcrypt.compare(password, userPassword, function (err, result) {
      if (err) {
        return res.status(400).json({ message: err }).end();
      } else {
        const jwt = sign(cred, process.env.JWT_KEY, {
          expiresIn: "24h",
        });
        res
          .setHeader(
            "Set-Cookie",
            cookie.serialize("jwt", jwt, {
              httpOnly: true,
              maxAge: maxAge,
              path: "/",
            })
          )
          .end();

        return res.status(200).json({ user: requestedUser.username }).end();
      }
    });
  });
}
