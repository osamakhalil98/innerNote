import Head from "next/head";
import Form from "../components/Form";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import dbConnect from "../middleware/database";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function Home() {
  return (
    <>
      <div className="bg-indigo-800 min-h-screen flex flex-col	justify-center items-center	">
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
          <span className="mb-3 text-indigo-100 cursor-pointer hover:underline">
            <Link href="/notes">
              <a>browse all InnerNotes →</a>
            </Link>
          </span>
          <Form />
        </main>
      </div>
    </>
  );
}
