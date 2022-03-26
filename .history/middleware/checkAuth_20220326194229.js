import jwt from "jsonwebtoken";

export default function checkAuth(headers) {
  const cookieStr = headers ? headers.cookie : "";

  if (cookieStr) {
    const cookie = cookieStr.substring(4);
    jwt.verify(cookie, `${process.env.JWT_KEY}`, function (err, decoded) {
      if (err) {
        return "UnAuthenticted";
      } else {
        return decoded;
      }
    });
    // console.log(decoded.message);
  } else {
    return "UnAuthenticted";
  }
}
