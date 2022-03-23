import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Card from "./Card";
import { useRouter } from "next/router";
import Pagination from "./Pagination";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../redux/userSlice";
import { TailSpin } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

export default function Grid({ loading }) {
  const [notesData, setNotesData] = useState("");
  const [notesType, setNotesType] = useState("");
  const [totalPages, setTotalPges] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const [pgClicked, setPgClicked] = useState(false);
  const usernameState = useSelector((state) => state.user.username);
  const loggedInState = useSelector((state) => state.user.isLoggedIn);
  const router = useRouter();
  const { type } = router.query;

  const getNotes = async () => {
    //check if there's selected type first

    if (notesType == "") {
      const notes = await fetch(`/api/notes`);
      console.log(notes);
      const jsonNotes = await notes.json();
      const data = await jsonNotes.data;
      setNotesData(data);
      setTotalPges(jsonNotes.totalPages);
      setActivePage(jsonNotes.currentPage);
    }

    if (pgClicked) {
      router.query.page = activePage;
      router.push(router);
      const notes = await fetch(`/api/notes?page=${activePage}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const jsonNotes = await notes.json();
      const data = await jsonNotes.data;
      setNotesData(data);
      setTotalPges(jsonNotes.totalPages);
      setActivePage(jsonNotes.currentPage);
    }
    if (notesType) {
      router.query.type = notesType;
      router.push(router);
      const notes = await fetch(`/api/notes?type=${notesType}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const jsonNotes = await notes.json();
      const data = await jsonNotes.data;
      setNotesData(data);
      setTotalPges(jsonNotes.totalPages);
      setActivePage(jsonNotes.currentPage);
    }
  };

  let handleDeselct = () => {
    setNotesType("");
    router.query.type = "";
    router.push(router);
  };
  useEffect(() => {
    if (loggedInState === false) {
      toast("Sign up/Sign in to view innerNotes", {
        icon: "🔒",
      });
      router.push("/");
    } else {
      getNotes();
    }
  }, [notesType, pgClicked, loggedInState]);

  return (
    <>
      <Toaster />
      {notesType && (
        <div
          onClick={handleDeselct}
          className="px-2 ml-4 mt-5 py-1 text-center text-xs font-medium rounded-full mx-1 cursor-pointer w-28 bg-red-100 text-blue-900"
        >
          {`X ${notesType}`}
        </div>
      )}

      {notesData ? (
        <div className="grid lg:grid-cols-3">
          {notesData.map((note, idx) => (
            <>
              <Card
                key={note._id}
                id={note._id}
                noteName={note.noteName}
                name={note.name}
                message={note.message}
                noteType={note.noteType}
                selectedType={(type) => setNotesType(type)}
              />
            </>
          ))}
        </div>
      ) : (
        <>
          <div className="mx-auto flex justify-center">
            <TailSpin
              height="100"
              width="100"
              color="#4F46E5"
              ariaLabel="loading"
            />
          </div>
        </>
      )}

      <Pagination
        totalPages={totalPages}
        currentPage={activePage}
        requestedPG={(requested) => setActivePage(requested)}
        pgClicked={(state) => setPgClicked(state)}
      />
    </>
  );
}
