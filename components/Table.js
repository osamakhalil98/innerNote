import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";

export default function Table() {
  const [notesData, setNotesData] = useState([]);
  const getNotes = async () => {
    const notes = await fetch(`${process.env.PROD_URL}/api/notes`);
    const jsonNotes = await notes.json();
    const data = await jsonNotes.data;
    setNotesData(data);
  };

  useEffect(() => {
    getNotes();
  }, [notesData]);

  const typeColor = (type) => {
    switch (type) {
      case "CONFESSION" || "confession":
        return "bg-red-400 text-red-800";

      case "IDEA" || "idea":
        return "bg-yellow-300 text-yellow-700";

      case "DREAM" || "dream":
        return "bg-blue-200 text-blue-800";

      default:
        return "bg-green-400 text-green-800";
    }
  };

  return (
    <div className="shadow overflow-hidden border-b border-gray-800 rounded-lg">
      <table className="min-w-full divide-y divide-gray-800 rounded-xl">
        <thead>
          <tr className="bg-gray-200 mt-4">
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
            >
              Message
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
            >
              Note Name
            </th>

            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
            >
              Note Type
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-700 divide-y divide-gray-500">
          {notesData
            ? notesData.map((elm, idx) => {
                return (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white ">
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      {elm.name}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      {elm.noteName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap capitalize">
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
    </div>
  );
}
