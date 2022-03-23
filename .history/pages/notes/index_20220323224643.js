import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Grid from "../../components/Grid";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { userActions } from "../../redux/userSlice";
import checkAuth from "../../middleware/checkAuth";

export default function InnerNotes({ headers }) {
  const router = useRouter();

  const loggedInState = useSelector((state) => state.user.isLoggedIn);

  const dispatch = useDispatch();
  const { setUserNameValue, loggedIn } = userActions;
  const [isLoggedIn, setIsLoggedIn] = useState(loggedInState);

  useEffect(() => {
    const authState = checkAuth(headers);
    if (authState !== "UnAuthenticted") {
      dispatch(loggedIn(true));
      dispatch(setUserNameValue(authState ? authState.userName : ""));
      setIsLoggedIn(true);
    } else {
      router.push("/");
      toast("Sign up/Sign in to view innerNotes!", {
        icon: "🔒",
      });
    }
  }, [isLoggedIn]);
  return (
    <>
      <Toaster />
      <div className="bg-indigo-800 min-h-screen flex flex-col	justify-center  items-center	overflow-hidden">
        <Head>
          <title>InnerNote</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="my-8">
          <p className="font-bold text-indigo-400 lg:text-7xl mb-4 pb-2 my-auto py-1 text-center explore-title">
            Explore all InnerNotes!
          </p>
          <span className="my-auto py-1 text-center text-blue-600 cursor-pointer hover:underline ">
            <Link href="/" className="text-center mb-4">
              <a className="text-center mb-4 text-indigo-100 mx-4">
                ← back to homepage
              </a>
            </Link>
          </span>
          <Grid className="mb-4 pb-4" />
        </main>
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const cookie = ctx.req ? ctx.req.headers : "";

  if (cookie !== undefined) {
    const headers = {
      cookie: JSON.stringify(cookie?.cookie),
    };
    return { props: { headers } };
  } else {
    return;
  }
}
