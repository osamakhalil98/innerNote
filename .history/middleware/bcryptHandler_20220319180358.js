import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import cookie from "cookie";

// calling this function will result in 500 status code

export default async function bcryptHandler(password, requestedUser, res) {
  return new Promise((resolve, reject) => {
    const maxAge = 3 * 24 * 60 * 60;
    try {
      const cred = {
        sub: requestedUser._id,
        userMail: requestedUser.email,
      };
      bcrypt.hash(password, 10);
      const comparePassword = bcrypt.compare(password, requestedUser.password);

      if (comparePassword) {
        const jwt = sign(cred, `${process.env.JWT_KEY}`, {
          expiresIn: "24h",
        });

        // saving jwt in a cookie
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("jwt", jwt, {
            httpOnly: true,
            maxAge: maxAge,
            path: "/",
          })
        );
        resolve();
        return res.status(200).json({ user: requestedUser.username });
      } else {
        resolve();
        return res
          .status(400)
          .json({ message: "This user isn't authenticated" });
      }
    } catch (e) {
      resolve();
      return res.status(400).json({ success: false, message: e.message });
    }
  });
}
