import jwt from "jsonwebtoken";

export default function checkAuth(headers) {
  const cookieStr = headers ? headers : "";
  console.log(cookieStr);
  if (cookieStr) {
    let cookie = cookieStr.cookie;
    console.log(cookie);
    //cookie = cookie.substring(4);
    cookie = "h";
    //const decoded = jwt.verify(cookie, process.env.JWT_KEY);
    //return decoded;
  } else {
    return "UnAuthenticted";
  }
}
