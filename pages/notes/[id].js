import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

export default function NoteId({ nnote }) {
  const router = useRouter();
  const id = router.query.id;
  const [note, setNote] = useState({});
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch(`http://localhost:3000/api/notes/${id}`);
      const { data } = await response.json();
      setNote(data);
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
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col	justify-center items-center">
      {note ? handleType(note.noteType) : ""}

      <div className="mx-32 w-sm pb-8 pt-4 px-8 rounded-xl bg-gray-800 shadow-1xl text-gray-100 mb-4">
        {note ? (
          <>
            <div className="text-center mb-4">
              <span className="title text-6xl py-4 text-center mb-2">
                {note.noteName}
              </span>
            </div>
            <p className="title text-lg w-96">{note.message} </p> <br />
            <span className="title text-sm">
              {note.name ? `-${note.name}` : ""}
            </span>
          </>
        ) : (
          ""
        )}
      </div>
      <span className="mb-3 text-blue-600 cursor-pointer hover:underline">
        <Link href="/notes">
          <a>← All InnerNotes!</a>
        </Link>
      </span>
    </div>
  );
}

NoteId.getInitialProps = async (ctx) => {
  const id = ctx.query;
  const fetchNote = await fetch(`http://localhost:3000/api/notes/${id}`);
  const { data } = fetchNote.json();
  return {
    props: {
      nnote: data,
    },
  };
};
