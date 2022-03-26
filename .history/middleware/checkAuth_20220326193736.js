import jwt from "jsonwebtoken";

export default function checkAuth(headers) {
  const cookieStr = headers ? headers.cookie : "";

  if (cookieStr) {
    const cookie = cookieStr.substring(4);
    const decoded = jwt.verify(cookie, `${process.env.JWT_KEY}`);
    console.log(decoded);
    return decoded;
  } else {
    return "UnAuthenticted";
  }
}
