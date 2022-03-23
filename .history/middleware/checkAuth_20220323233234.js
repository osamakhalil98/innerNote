import jwt from "jsonwebtoken";

export default function checkAuth(headers) {
  const cookieStr = headers ? headers : "";
  if (cookieStr) {
    let cookie = cookieStr.cookie;
    let cutCookie = cookie.substring(4);
    console.log(cutCookie);
    const decoded = jwt.verify(cutCookie, process.env.JWT_KEY);
    return decoded;
  } else {
    return "UnAuthenticted";
  }
}
