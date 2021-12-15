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
  const [ideaLiked, setIdeaLiked] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`idea-liked-${id}`);
      const initialValue = saved;
      return initialValue || false;
    }
  });
  const [sadCount, setSadCount] = useState(0);
  const [sadLiked, setSadLiked] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`sad-liked-${id}`);
      const initialValue = saved;
      return initialValue || false;
    }
  });
  const [likeCount, setLikeCount] = useState(0);
  const [likeLiked, setLikeLiked] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`like-liked-${id}`);
      const initialValue = saved;
      return initialValue || false;
    }
  });
  const [loveCount, setLoveCount] = useState(0);
  const [loveLiked, setLoveLiked] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`love-liked-${id}`);
      const initialValue = saved;
      return initialValue || false;
    }
  });

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

  /*if (typeof window !== "undefined") {
    sadState = localStorage.setItem(`sad-liked-${id}`, false);
  }*/
  useEffect(() => {
    setSadLiked(window.localStorage.getItem(`sad-liked-${id}`));

    setLikeLiked(window.localStorage.getItem(`like-liked-${id}`));

    setIdeaLiked(window.localStorage.getItem(`idea-liked-${id}`));

    setLoveLiked(window.localStorage.getItem(`love-liked-${id}`));
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
    //check if this client liked the note before or not first
    let count = sadCount;

    if (sadLiked == true || sadLiked == "true") {
      count -= 1;
      localStorage.setItem(`sad-liked-${id}`, false);
      setSadLiked(false);
    } else {
      count += 1;
      localStorage.setItem(`sad-liked-${id}`, true);
      console.log(localStorage.getItem(`sad-liked-${id}`));
      setSadLiked(true);
    }
    setSadCount(count);
    await fetch(`/api/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        stats: {
          idea: ideaCount,
          like: likeCount,
          sad: count,
          love: loveCount,
        },
      }),
    });
  };
  const handleLoveChange = async () => {
    //check if this client liked the note before or not first
    let count = loveCount;

    if (loveLiked == true || loveLiked == "true") {
      count -= 1;
      localStorage.setItem(`love-liked-${id}`, false);
      setLoveLiked(false);
    } else {
      count += 1;
      localStorage.setItem(`love-liked-${id}`, true);
      console.log(localStorage.getItem(`love-liked-${id}`));
      setLoveLiked(true);
    }
    setLoveCount(count);
    await fetch(`/api/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        stats: { idea: ideaCount, like: likeCount, sad: sadCount, love: count },
      }),
    });
  };
  const handleLikeChange = async () => {
    //check if this client liked the note before or not first
    let count = likeCount;

    if (likeLiked == true || likeLiked == "true") {
      count -= 1;
      localStorage.setItem(`like-liked-${id}`, false);
      setLikeLiked(false);
    } else {
      count += 1;
      localStorage.setItem(`like-liked-${id}`, true);
      console.log(localStorage.getItem(`like-liked-${id}`));
      setLikeLiked(true);
    }
    setLikeCount(count);
    await fetch(`/api/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        stats: { idea: ideaCount, like: count, sad: sadCount, love: loveCount },
      }),
    });
  };
  const handleIdeaChange = async () => {
    //check if this client liked the note before or not first
    let count = ideaCount;

    if (ideaLiked == true || ideaLiked == "true") {
      count -= 1;
      localStorage.setItem(`idea-liked-${id}`, false);
      setIdeaLiked(false);
    } else {
      count += 1;
      localStorage.setItem(`idea-liked-${id}`, true);
      console.log(localStorage.getItem(`idea-liked-${id}`));
      setIdeaLiked(true);
    }
    setIdeaCount(count);
    await fetch(`/api/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        stats: { idea: count, like: likeCount, sad: sadCount, love: loveCount },
      }),
    });
  };
  return (
    <div className="bg-indigo-800 min-h-screen flex flex-col	justify-center items-center overflow-hidden">
      {note ? handleType(note.noteType) : ""}

      <div className="mx-8 w-sm pb-8 pt-4 px-8 rounded-xl bg-indigo-600 shadow-1xl text-indigo-200 mb-4 md:w-96 ">
        {note ? (
          <>
            <div className="text-center mb-4 text-indigo-200">
              <span className="text-6xl py-4 text-center mb-2">
                {note.noteName}
              </span>
            </div>
            <div className="oveflow-hidden w-24">
              <p className="text-indigo-200 text-lg md:w-1/2">
                {note.message}{" "}
              </p>{" "}
              <br />
              <span className="text-indigo-200 text-sm">
                {note.name ? `-${note.name}` : ""}
              </span>
            </div>
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
      <div className="rounded-xl bg-indigo-600 shadow-1xl text-indigo-200 mb-4 md:w-52 flex justify-center p-4 my-2">
        <div className="flex my-3 py-3 ">
          <TwitterShareButton
            url={`https://inner-note.vercel.app/notes/${id}`}
            title={note ? note.noteName : ""}
          >
            <TwitterIcon size={40} round={true} className="mx-2" />
          </TwitterShareButton>
          <WhatsappShareButton
            url={`https://inner-note.vercel.app/notes/${id}`}
            title={note ? note.noteName : ""}
          >
            <WhatsappIcon size={40} round={true} className="mx-2" />
          </WhatsappShareButton>
          <FacebookShareButton
            url={`https://inner-note.vercel.app/notes/${id}`}
            quote={`Check out this innerNote: ${note ? note.noteName : ""}`}
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
