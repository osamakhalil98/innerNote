import jwt from "jsonwebtoken";

export default function checkAuth(headers) {
  const cookieStr = headers ? headers.cookie : "";

  if (cookieStr) {
    const slicedCookie = cookieStr.substring(4);
    /*  jwt.verify(slicedCookie, `${process.env.JWT_KEY}`, function (err, decoded) {
      if (err) {
        // console.log(err);
        return "UnAuthenticted";
      } else {
        console.log(decoded);
        return decoded;
      }
    });*/
    // console.log(decoded.message);
    var isExpired = false;
    const token = slicedCookie;
    let decodedToken = jwt.decode(token, { complete: true });
    let dateNow = new Date();

    if (decodedToken.exp < dateNow.getTime()) {
      isExpired = true;
      console.log(isExpired);
    }
  } else {
    return "UnAuthenticted";
  }
}
