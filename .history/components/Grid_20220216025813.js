import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Card from "./Card";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Grid() {
  const [notesData, setNotesData] = useState([]);
  const [notesType, setNotesType] = useState("");
  const [totalPages, setTotalPges] = useState(1);
  const [activePage, setActivePage] = useState(1);
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
      setTotalPges(totalPages);
      setActivePage(currentPage);
    } else if (notesType) {
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
    }
  };
  useEffect(() => {
    getNotes();
  }, [notesType]);
  let arr = Array.from(Array(totalPages).keys());

  const activePage = function (current) {
    if (current + 1 === currentPage) {
      return "bg-indigo-600";
    } else {
      return "bg-indigio-900";
    }
  };
  return (
    <div className="grid lg:grid-cols-3">
      {notesData
        ? notesData.map((note, idx) => {
            return (
              <>
                <Card
                  key={idx}
                  id={note._id}
                  noteName={note.noteName}
                  name={note.name}
                  message={note.message}
                  type={note.noteType}
                  selectedType={(type) => setNotesType(type)}
                />
                <div className="flex justify-center">
                  {arr.map((elm) => (
                    <div
                      className={`w-8 h-8 ${activePage(
                        elm
                      )} pagination-box shadow hover:bg-indigo-400 cursor-pointer p-1 m-2`}
                    >
                      {elm + 1}
                    </div>
                  ))}
                </div>
              </>
            );
          })
        : ""}
    </div>
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
