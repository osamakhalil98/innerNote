import jwt from "jsonwebtoken";

export default function checkAuth(headers) {
  const cookieStr = headers ? headers.cookie : "";

  if (cookieStr) {
    const slicedCookie = cookieStr.substring(4);
    jwt.verify(slicedCookie, `${process.env.JWT_KEY}`, function (err, decoded) {
      if (err) {
        // console.log(err);
        return "UnAuthenticted";
      } else {
        console.log(decoded);
        return decoded;
      }
    });
    // console.log(decoded.message);
  } else {
    return "UnAuthenticted";
  }
}
