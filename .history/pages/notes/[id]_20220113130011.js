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
  const router = useRouter();
  let [currentId, setCurrentId] = useState(router.query.id);
  let [currentIndex, setCurrentIndex] = useState(0);
  const [note, setNote] = useState({});
  const [notes, setNotes] = useState([]);
  const [ideaCount, setIdeaCount] = useState(0);
  const [ideaLiked, setIdeaLiked] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`idea-liked-${currentId}`);
      const initialValue = saved;
      return initialValue || false;
    }
  });
  const [sadCount, setSadCount] = useState(0);
  const [sadLiked, setSadLiked] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`sad-liked-${currentId}`);
      const initialValue = saved;
      return initialValue || false;
    }
  });
  const [likeCount, setLikeCount] = useState(0);
  const [likeLiked, setLikeLiked] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`like-liked-${currentId}`);
      const initialValue = saved;
      return initialValue || false;
    }
  });
  const [loveCount, setLoveCount] = useState(0);
  const [loveLiked, setLoveLiked] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`love-liked-${currentId}`);
      const initialValue = saved;
      return initialValue || false;
    }
  });

  async function fetchMyAPI() {
    let response = await fetch(`/api/notes/${currentId}`, {
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

  async function fetchAllNotes() {
    let response = await fetch(`/api/notes`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const jsonData = await response.json();
    const data = await jsonData.data;
    setNotes(data);
    let index = data.findIndex((obj) => obj._id == currentId);
    setCurrentIndex(index);
  }

  async function handlePrev() {
    let index = currentIndex;
    const prevNote = index == 0 ? notes[index] : notes[index - 1];
    setCurrentIndex(index);

    let response = await fetch(`/api/notes/${prevNote._id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const { data } = await response.json();

    setNote(data);
    setCurrentId(data._id);
    setSadCount(data.stats.sad);
    setLikeCount(data.stats.like);
    setLoveCount(data.stats.love);
    setIdeaCount(data.stats.idea);
    router.query.id = currentId;
  }

  async function handleNext() {
    let index = currentIndex;
    let length = notes.length;
    const nextNote = index == length - 1 ? notes[index] : notes[index + 1];
    setCurrentIndex(index);

    let response = await fetch(`/api/notes/${nextNote._id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const { data } = await response.json();

    setNote(data);
    setCurrentId(data._id);
    setSadCount(data.stats.sad);
    setLikeCount(data.stats.like);
    setLoveCount(data.stats.love);
    setIdeaCount(data.stats.idea);
    router.query.id = currentId;
  }
  /*if (typeof window !== "undefined") {
    sadState = localStorage.setItem(`sad-liked-${id}`, false);
  }*/
  useEffect(() => {
    setSadLiked(window.localStorage.getItem(`sad-liked-${currentId}`));

    setLikeLiked(window.localStorage.getItem(`like-liked-${currentId}`));

    setIdeaLiked(window.localStorage.getItem(`idea-liked-${currentId}`));

    setLoveLiked(window.localStorage.getItem(`love-liked-${currentId}`));
    fetchMyAPI();
    fetchAllNotes();
  }, [currentIndex, currentId]);

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
      localStorage.setItem(`sad-liked-${currentId}`, false);
      setSadLiked(false);
    } else {
      count += 1;
      localStorage.setItem(`sad-liked-${currentId}`, true);
      console.log(localStorage.getItem(`sad-liked-${currentId}`));
      setSadLiked(true);
    }
    setSadCount(count);
    await fetch(`/api/notes/${currentId}`, {
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
      localStorage.setItem(`love-liked-${currentId}`, false);
      setLoveLiked(false);
    } else {
      count += 1;
      localStorage.setItem(`love-liked-${currentId}`, true);
      console.log(localStorage.getItem(`love-liked-${currentId}`));
      setLoveLiked(true);
    }
    setLoveCount(count);
    await fetch(`/api/notes/${currentId}`, {
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
      localStorage.setItem(`like-liked-${currentId}`, false);
      setLikeLiked(false);
    } else {
      count += 1;
      localStorage.setItem(`like-liked-${currentId}`, true);
      console.log(localStorage.getItem(`like-liked-${currentId}`));
      setLikeLiked(true);
    }
    setLikeCount(count);
    await fetch(`/api/notes/${currentId}`, {
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
      localStorage.setItem(`idea-liked-${currentId}`, false);
      setIdeaLiked(false);
    } else {
      count += 1;
      localStorage.setItem(`idea-liked-${currentId}`, true);
      console.log(localStorage.getItem(`idea-liked-${currentId}`));
      setIdeaLiked(true);
    }
    setIdeaCount(count);
    await fetch(`/api/notes/${currentId}`, {
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
            <p className="text-indigo-200 text-lg md:sw-90 break-words">
              {note.message}{" "}
            </p>{" "}
            <br />
            <span className="text-indigo-200 text-sm break-words">
              {note.name ? `-${note.name}` : ""}
            </span>
          </>
        ) : (
          ""
        )}
      </div>

      <div className="flex mb-8">
        <div className="text-center">
          {console.log("sadliked", sadLiked)}
          <HiEmojiSad
            size={`2em`}
            className={`${
              sadLiked == true || sadLiked == "true"
                ? "text-green-500"
                : "text-red-500"
            } cursor-pointer hover:text-green-300 mb-3 mx-4`}
            onClick={handleSadChange}
          />
          <div
            className={`text-sm ${
              sadLiked ? "text-green-500" : "text-indigo-200"
            }
            `}
          >
            {sadCount}
          </div>
        </div>
        <div className="text-center">
          <AiFillLike
            size={`2em`}
            className={`${
              likeLiked === true || likeLiked === "true"
                ? "text-blue-600"
                : "text-indigo-200"
            } cursor-pointer hover:text-blue-400 mb-3 mx-4`}
            onClick={handleLikeChange}
          />
          <div
            className={`text-sm ${
              likeLiked ? "text-blue-600" : "text-indigo-200"
            }
            `}
          >
            {likeCount}
          </div>
        </div>
        <div className="text-center">
          <AiFillHeart
            size={`2em`}
            className={`${
              loveLiked ? "text-red-600" : "text-indigo-200"
            } cursor-pointer hover:text-red-500 mb-3 mx-4`}
            onClick={handleLoveChange}
          />
          <div
            className={`text-sm ${
              loveLiked ? "text-red-600" : "text-indigo-200"
            } `}
          >
            {loveCount}
          </div>
        </div>
        <div className="text-center">
          <BsLightbulbFill
            size={`2em`}
            className={`${
              ideaLiked ? "text-yellow-500" : "text-indigo-200"
            } cursor-pointer hover:text-yellow-300 mb-3 mx-4`}
            onClick={handleIdeaChange}
          />
          <div
            className={`text-sm ${
              ideaLiked ? "text-yellow-500" : "text-indigo-200"
            } `}
          >
            {ideaCount}
          </div>
        </div>
      </div>
      <div className="mb-4 pb-2 md:w-84">
        {notes[currentIndex - 1] ? (
          <span
            className="m-4 text-indigo-100 cursor-pointer hover:underline"
            onClick={handlePrev}
          >
            <Link href={`/notes/${notes[currentIndex - 1]._id}`}>
              <a>← Prev</a>
            </Link>
          </span>
        ) : (
          ""
        )}
        {notes[currentIndex + 1] ? (
          <span
            className="m-4 text-indigo-100 cursor-pointer hover:underline"
            onClick={handleNext}
          >
            <Link href={`/notes/${notes[currentIndex + 1]._id}`}>
              <a>Next →</a>
            </Link>
          </span>
        ) : (
          ""
        )}
      </div>
      <h3 className="text-indigo-400">Share this innerNote!</h3>
      <div className="rounded-xl bg-indigo-600 shadow-1xl text-indigo-200 mb-4 md:w-52 flex justify-center p-4 my-2">
        <div className="flex my-3 py-3 ">
          <TwitterShareButton
            url={`https://inner-note.vercel.app/notes/${currentId}`}
            title={note ? note.noteName : ""}
          >
            <TwitterIcon size={40} round={true} className="mx-2" />
          </TwitterShareButton>
          <WhatsappShareButton
            url={`https://inner-note.vercel.app/notes/${currentId}`}
            title={note ? note.noteName : ""}
          >
            <WhatsappIcon size={40} round={true} className="mx-2" />
          </WhatsappShareButton>
          <FacebookShareButton
            url={`https://inner-note.vercel.app/notes/${currentId}`}
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
