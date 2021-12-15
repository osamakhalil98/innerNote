import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Card({
  noteName,
  name,
  message,
  type,
  id,
  selectedType,
}) {
  const { query } = useRouter();
  const [selectedNoteType, setSelectedNoteType] = useState("");

  const typeColor = (type) => {
    switch (type) {
      case "CONFESSION" || "confession":
        return "bg-red-400 text-red-800";
        break;
      case "IDEA" || "idea":
        return "bg-yellow-300 text-yellow-700";
        break;
      case "DREAM" || "dream":
        return "bg-blue-200 text-blue-800";
        break;
      default:
        return "bg-green-400 text-green-800";
    }
  };

  const handleTypeClick = async () => {
    setSelectedNoteType(type);
    return selectedType(type);
  };
  return (
    <>
      {console.log(query.type)}
      <div className="md:w-80 bg-indigo-600 rounded-lg shadow overflow-hidden hover:bg-indigo-500 py-4 my-8 mx-4 card-wrapper">
        <h1 className="text-center py-1 font-bold text-indigo-100 md:text-2xl">
          {noteName}
        </h1>
        <Link href={`/notes/${id}`}>
          <div className="w-80 truncate mx-auto whitespace-nowrap text-sm font-medium cursor-pointer">
            <p className="py-4 px-8 text-justify text-indigo-300 text-lg  truncate">
              {message}
            </p>
          </div>
        </Link>
        <p className="font-medium text-indigo-200 px-5 py-4">-{name}</p>
        <span
          onClick={handleTypeClick}
          className={`px-2 py-0.5 text-xs font-medium rounded-full mx-3 cursor-pointer ${typeColor(
            type
          )}`}
        >
          {type}
        </span>
      </div>
    </>
  );
}
