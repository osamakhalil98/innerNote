import React, { useEffect } from "react";

export default function Pagination({ totalPages }) {
  let arr = Array.from(Array(totalPages).keys());
  return (
    <div className="flex justify-center">
      {arr.map((elm) => (
        <div className="w-8 h-8 bg-indigo-900 pagination-box shadow hover:bg-indigo-400 cursor-pointer p-1 m-2">
          {elm + 1}
        </div>
      ))}
    </div>
  );
}
