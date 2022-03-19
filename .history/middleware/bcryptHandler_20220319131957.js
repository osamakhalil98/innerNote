import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import cookie from "cookie";

// calling this function will result in 500 status code

export default async function bcryptHandler(
  password,
  userPassword,
  cred,
  requestedUser,
  res
) {
  return new Promise((resolve, reject) => {
    const maxAge = 3 * 24 * 60 * 60;
    try {
      const hashedPassword = bcrypt.hash(password, 10);
      const comparePassword = bcrypt.compare(password, hashedPassword);

      if (comparePassword) {
        const cred = {
          sub: requestedUser._id,
          userMail: requestedUser.email,
        };
      }
    } catch (e) {
      resolve();
      return res.status(400).json({ success: false, message: e.message });
    }
  });
}

/*
 bcrypt.compare(password, userPassword, function (err, result) {
          if (err) {
            return res.status(400).json({ message: err });
          }
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
          resolve();
          return res.status(200).json({ user: requestedUser.username });
        });

*/

/*


function (err, result) {
        if (err) {
          return res.status(400).json({ message: err });
        }
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
        resolve();
        return res.status(200).json({ user: requestedUser.username });
      }
*/
