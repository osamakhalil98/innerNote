import jwt from "jsonwebtoken";

export default function checkAuth(headers) {
  const cookieStr = headers ? headers.cookie : "";

  if (cookieStr) {
    const cookie = cookieStr.substring(4);
    const decoded = jwt.verify(
      cookie,
      `${process.env.JWT_KEY}`,
      function (err, decoded) {
        if (err) {
          /*
          err = {
            name: 'TokenExpiredError',
            message: 'jwt expired',
            expiredAt: 1408621000
          }
        */
        }
      }
    );
    // console.log(decoded.message);
    return decoded;
  } else {
    return "UnAuthenticted";
  }
}
