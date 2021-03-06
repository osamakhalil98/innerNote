import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Card from "./Card";
import { useRouter } from "next/router";
import Pagination from "./Pagination";
import { TailSpin } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Link from "next/link";

export default function Grid({ loading }) {
  const [notesData, setNotesData] = useState("");
  const [notesType, setNotesType] = useState("");
  const [totalPages, setTotalPges] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const [pgClicked, setPgClicked] = useState(false);

  const router = useRouter();
  const { type } = router.query;

  const getNotes = async () => {
    //check if there's selected type first

    if (notesType == "") {
      const notes = await fetch(`/api/notes`, {
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
    getNotes();
  }, [notesType, pgClicked]);

  return (
    <>
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
                key={idx}
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
        <TailSpin
          height="100"
          width="100"
          color="#4F46E5"
          ariaLabel="loading"
        />
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

/* <div className="shadow overflow-hidden border-b border-gray-800 rounded-lg table mt-4">
      <table className="divide-y divide-gray-800 rounded-xl ">
        <thead>
          <tr className="bg-gray-200 mt-4">
            <th
              scope="col"
              className="md:px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
            >
              Message
            </th>
            <th
              scope="col"
              className="md:px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider note-name-author"
            >
              Name
            </th>
            <th
              scope="col"
              className="md:px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider note-name"
            >
              Note Name
            </th>

            <th
              scope="col"
              className="md:px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider note-type"
            >
              Note Type
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-700 divide-y divide-grey-200 md:w-96 table-body">
          {notesData
            ? notesData.map((elm, idx) => {
                return (
                  <tr key={idx} className="md:w-96">
                    <td className="md:px-6 py-4 whitespace-nowrap text-sm font-medium text-white ">
                      <p className="w-80 truncate cursor-pointer">
                        {" "}
                        <Link
                          href={`/notes/${elm._id}`}
                          //as={`/notes/${idx + 1}`}
                        >
                          <a>{elm.message}</a>
                        </Link>
                      </p>
                    </td>
                    <td className="md:px-6 py-4 whitespace-nowrap text-sm font-medium text-white note-name-author">
                      {elm.name}
                    </td>

                    <td className="md:px-6 py-4 whitespace-nowrap text-sm font-medium text-white note-name">
                      {elm.noteName}
                    </td>
                    <td className="md:px-6 py-4 whitespace-nowrap capitalize note-type">
                      <span
                        className={`flex-shrink-0 inline-block px-2 py-0.5 text-xs font-medium rounded-full ${typeColor(
                          elm.noteType
                        )}`}
                      >
                        {elm.noteType}
                      </span>
                    </td>
                  </tr>
                );
              })
            : ""}
        </tbody>
      </table>
            </div>*/
