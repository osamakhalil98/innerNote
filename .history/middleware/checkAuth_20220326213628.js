import jwt from "jsonwebtoken";

export default function checkAuth(headers) {
  const cookieStr = headers ? headers.cookie : "";
  let jwtTokenState = "";

  if (cookieStr) {
    const slicedCookie = cookieStr.substring(4);
    jwt.verify(slicedCookie, `${process.env.JWT_KEY}`, function (err, decoded) {
      if (err) {
        jwtTokenState = "jwtTokenExpired";
      } else {
        jwtTokenState = decoded;
        console.log(jwtTokenState);
      }
    });

    return jwtTokenState;
  } else {
    return "UnAuthenticted";
  }
}
