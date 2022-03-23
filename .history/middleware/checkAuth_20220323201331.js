import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../redux/userSlice";
import jwt from "jsonwebtoken";

export default function checkAuth(headers) {
  const usernameState = useSelector((state) => state.user.username);
  const loggedInState = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const { setUserNameValue, loggedIn } = userActions;

  const cookieStr = headers?.cookie;

  if (cookieStr) {
    dispatch(loggedIn(true));
    const cookie = cookieStr.substring(4);
    const decoded = jwt.verify(cookie, process.env.JWT_KEY);
    dispatch(setUserNameValue(decoded.userName));
    return decoded;
  } else {
    return "UnAuthenticted";
  }
}
