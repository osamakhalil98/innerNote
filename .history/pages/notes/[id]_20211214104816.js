import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { server } from "../../config";
import { HiEmojiSad } from "react-icons/hi";
import { AiFillLike } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { BsLightbulbFill } from "react-icons/bs";
import {
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
} from "react-share";

export default function NoteId({ nnote }) {
  const size = 67;
  const router = useRouter();
  const id = router.query.id;
  const [note, setNote] = useState({});
  const [ideaCount, setIdeaCount] = useState(0);
  const [sadCount, setSadCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [loveCount, setLoveCount] = useState(0);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch(`/api/notes/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const { data } = await response.json();

      setNote(data);

      setSadCount(data.stats.sad);
      setLikeCount(data.stats.like);
      setLoveCount(data.stats.love);
      setIdeaCount(data.stats.idea);
    }

    fetchMyAPI();
  }, []);

  const handleType = (type) => {
    switch (type) {
      case "CONFESSION":
        return <Image src="/confession.svg" height={250} width={250} />;
        break;

      case "DREAM":
        return <Image src="/dream.svg" height={250} width={250} />;
        break;
      case "IDEA":
        return <Image src="/idea.svg" height={250} width={250} />;
        break;

      default:
        return <Image src="/thought.svg" height={250} width={250} />;
    }
  };

  const handleSadChange = async () => {
    let count = sadCount;
    if (count === 0) {
      count = 1;
    } else {
      count = 0;
    }
    setSadCount(count);
    await fetch(`/api/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ stats: { sad: count } }),
    });
  };
  const handleLoveChange = async () => {
    let count = loveCount;
    if (count === 0) {
      count = 1;
    } else {
      count = 0;
    }
    setLoveCount(count);
    await fetch(`/api/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ stats: { love: count } }),
    });
  };
  const handleLikeChange = async () => {
    let count = likeCount;
    if (count === 0) {
      count = 1;
      console.log("clicked");
    } else {
      count = 0;
    }
    setLikeCount(count);
    await fetch(`/api/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ stats: { like: count } }),
    });
  };
  const handleIdeaChange = async () => {
    let count = ideaCount;
    if (count === 0) {
      count = 1;
    } else {
      count = 0;
    }
    setIdeaCount(count);
    await fetch(`/api/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        stats: { idea: count },
        stats: { like: likeCount },
      }),
    });
  };
  return (
    <div className="bg-indigo-800 min-h-screen flex flex-col	justify-center items-center overflow-hidden">
      {note ? handleType(note.noteType) : ""}

      <div className="mx-8 w-sm pb-8 pt-4 px-8 rounded-xl bg-indigo-600 shadow-1xl text-indigo-200 mb-4 md:w-96">
        {note ? (
          <>
            <div className="text-center mb-4 text-indigo-200">
              <span className="text-6xl py-4 text-center mb-2">
                {note.noteName}
              </span>
            </div>
            <p className="text-indigo-200 text-lg md:sw-90">{note.message} </p>{" "}
            <br />
            <span className="text-indigo-200 text-sm">
              {note.name ? `-${note.name}` : ""}
            </span>
          </>
        ) : (
          ""
        )}
      </div>

      <div className="flex mb-8">
        <div className="text-center">
          <HiEmojiSad
            size={`2em`}
            className="text-indigo-200 cursor-pointer hover:text-indigo-400 mb-3 mx-4"
            onClick={handleSadChange}
          />
          <div className="text-sm text-indigo-200">{sadCount}</div>
        </div>
        <div className="text-center">
          <AiFillLike
            size={`2em`}
            className="text-indigo-200 cursor-pointer hover:text-indigo-400 mb-3 mx-4"
            onClick={handleLikeChange}
          />
          <div className="text-sm text-indigo-200">{likeCount}</div>
        </div>
        <div className="text-center">
          <AiFillHeart
            size={`2em`}
            className="text-indigo-200 cursor-pointer hover:text-indigo-400 mb-3 mx-4"
            onClick={handleLoveChange}
          />
          <div className="text-sm text-indigo-200">{loveCount}</div>
        </div>
        <div className="text-center">
          <BsLightbulbFill
            size={`2em`}
            className="text-indigo-200 cursor-pointer hover:text-indigo-400 mb-3 mx-4"
            onClick={handleIdeaChange}
          />
          <div className="text-sm text-indigo-200">{ideaCount}</div>
        </div>
      </div>
      <h3 className="text-indigo-400">Share this innerNote!</h3>
      <div className="rounded-xl bg-indigo-600 shadow-1xl text-indigo-200 mb-4 md:w-64 flex justify-center p-4 my-2">
        <div className="flex my-3 py-3 ">
          <TwitterShareButton
            url={`https://inner-note.vercel.app/notes/${id}`}
            title={note.noteName}
          >
            <TwitterIcon size={40} round={true} className="mx-2" />
          </TwitterShareButton>
          <WhatsappShareButton
            url={`https://inner-note.vercel.app/notes/${id}`}
            title={note.noteName}
          >
            <WhatsappIcon size={40} round={true} className="mx-2" />
          </WhatsappShareButton>
          <FacebookShareButton
            url={`https://inner-note.vercel.app/notes/${id}`}
            quote={`Check out this innerNote: ${note.noteName}`}
          >
            <FacebookIcon size={40} round={true} className="mx-2" />
          </FacebookShareButton>
        </div>
      </div>
      <span className="mb-3 text-indigo-100 cursor-pointer hover:underline">
        <Link href="/notes">
          <a>← All InnerNotes!</a>
        </Link>
      </span>
    </div>
  );
}

NoteId.getInitialProps = async (ctx) => {
  const { id } = ctx.query;

  const fetchNote = await fetch(`${server}/api/notes/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const { data } = fetchNote.json();
  return {
    props: {
      nnote: data,
    },
  };
};
