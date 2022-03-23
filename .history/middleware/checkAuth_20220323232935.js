import jwt from "jsonwebtoken";

export default function checkAuth(headers) {
  const cookieStr = headers ? headers : "";
  console.log(cookieStr);
  if (cookieStr) {
    let cookie = cookieStr.cookie;
    cookie = cookie.substring(4);
    const decoded = jwt.verify(cookie, process.env.JWT_KEY);
    return decoded;
  } else {
    return "UnAuthenticted";
  }
}
