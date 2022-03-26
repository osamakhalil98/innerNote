import Head from "next/head";
import Form from "../components/Form";
import Link from "next/link";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { userActions } from "../redux/userSlice";
import { removeCookies } from "cookies-next";
import checkAuth from "../middleware/checkAuth";

export default function Home({ headers }) {
  const usernameState = useSelector((state) => state.user.username);
  const loggedInState = useSelector((state) => state.user.isLoggedIn);

  const dispatch = useDispatch();
  const { setUserNameValue, loggedIn } = userActions;
  const [userName, setUserName] = useState(usernameState);

  useEffect(() => {
    const authState = checkAuth(headers);
    console.log(authState);
    if (headers !== "UnAuthenticted") {
      console.log(headers);
      dispatch(loggedIn(true));
      dispatch(setUserNameValue(headers?.userName));
      setUserName(headers?.userName);
    } else if (headers === "UnAuthenticted") {
      handleLogout();
    }
  }, [userName]);

  const handleLogout = () => {
    dispatch(loggedIn(false));
    dispatch(setUserNameValue(""));
  };
  return (
    <>
      <div className="bg-indigo-800 min-h-screen flex flex-col justify-center items-center">
        <Head>
          <title>InnerNote</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="text-center  flex flex-col justify-center items-center title-wrapper overflow-hidden">
          <h1 className="font-bold mb-4 pb-4 my-auto py-8 title md:text-6xl">
            Express yourself safely with{" "}
            <span className="main-title">InnerNote.</span> <br />
            <span className="sub-title md:text-2xl">
              and dive deep into people&apos;s minds
            </span>
          </h1>
          {userName ? (
            <h1 className="font-bold mb-4 pb-2 my-auto py-3 px-4 title md:text-xl rounded-full mx-4  bg-red-100 text-blue-900">
              <span className="text-sm">Hi,</span> {`${userName} 👋🏼`}{" "}
            </h1>
          ) : (
            ""
          )}
          <span className="mb-3 text-indigo-100 cursor-pointer hover:underline">
            <Link href="/notes">
              <a>browse all InnerNotes →</a>
            </Link>
          </span>
          <Form />
          {loggedInState === false ? (
            <>
              <span className="mb-3 text-indigo-100 cursor-pointer hover:underline">
                <Link href="/signup">
                  <a>Not a memeber? sign up now! →</a>
                </Link>
              </span>
              <span className="mb-3 text-indigo-100 cursor-pointer hover:underline">
                <Link href="/signin">
                  <a>Already a memeber? sign in now! →</a>
                </Link>
              </span>
            </>
          ) : (
            <span className="px-2 ml-4 mb-4 mt-5 py-1 text-center text-xs font-medium rounded-full mx-1 cursor-pointer w-28 bg-red-100 text-blue-900">
              <span onClick={handleLogout}>
                <a>helllooooooooooooo </a>
              </span>
            </span>
          )}
        </main>
      </div>
    </>
  );
}

Home.getInitialProps = async (ctx) => {
  const cookie = ctx.req?.headers.cookie;
  const headers = {
    cookie: cookie,
  };

  return { headers };
};
