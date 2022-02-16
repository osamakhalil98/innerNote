import React, { useEffect, useState } from "react";

export default function Pagination({ totalPages, currentPage }) {
  let arr = Array.from(Array(totalPages).keys());
  const [current, setCurrent] = useState(currentPage);
  const SELECTEDCOLOR = "bg-indigo-600";
  const NONSELCTEDCOLOR = "bg-indigo-900";
  

  const handleClick = function (current) {
    setCurrent(current + 1);
  };
  return (
    <div className="flex justify-center">
      {arr.map((elm) => (
        <div
          onClick={() => handleClick(elm + 1)}
          className={`w-8 h-8 ${} pagination-box shadow hover:bg-indigo-400 cursor-pointer p-1 m-2`}
        >
          {elm + 1}
        </div>
      ))}
    </div>
  );
}
