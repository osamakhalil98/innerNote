import jwt from "jsonwebtoken";

export default function checkAuth(headers) {
  if (headers !== null) {
    const cookieStr = headers;

    if (cookieStr) {
      const cookie = cookieStr.substring(4);
      const decoded = jwt.verify(cookie, process.env.JWT_KEY);
      return decoded;
    }
  } else {
    return "UnAuthenticted";
  }
}
