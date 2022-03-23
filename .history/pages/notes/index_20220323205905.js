import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Grid from "../../components/Grid";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/userSlice";
import checkAuth from "../../middleware/checkAuth";

export default function InnerNotes({ headers }) {
  const dispatch = useDispatch();
  const { setUserNameValue, loggedIn } = userActions;

  useEffect(() => {
    const authState = checkAuth(headers);
    console.log(authState);
    if (authState !== "UnAuthenticted") {
      dispatch(loggedIn(true));
      dispatch(setUserNameValue(authState.userName));
    }
  }, [authState]);
  return (
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
  );
}

InnerNotes.getInitialProps = async (ctx) => {
  const cookie = ctx.req?.headers.cookie;
  const headers = {
    cookie: cookie,
  };
  return { headers };
};
