import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Card from "./Card";
import Link from "next/link";

export default function Grid() {
  const [notesData, setNotesData] = useState([]);
  const [notesType, setNotesType] = useState('');
  const getNotes = async () => {
    const notes = await fetch(`/api/notes`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    console.log(notes);
    const jsonNotes = await notes.json();
    const data = await jsonNotes.data;
    setNotesData(data);
    console.log(notesData);
  };

  useEffect(() => {
    getNotes();
  }, []);

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
                  selectedType = {type => }
                />
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
