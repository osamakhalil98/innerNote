import React, { useEffect, useState, useRef } from "react";

export default function Pagination({ totalPages, currentPage }) {
  let arr = Array.from(Array(4).keys());
  const colorRef = useRef("bg-indigo-900");
  const [current, setCurrent] = useState(currentPage);
  const SELECTEDCOLOR = "bg-indigo-600";
  const NONSELCTEDCOLOR = "bg-indigo-900";

  const handleClick = function (current) {
    const clickedDiv = colorRef.current;
    console.log(clickedDiv);
    setCurrent(current);
    clickedDiv.className =
      "rounded-2xl text-white text-center shadow hover:bg-indigo-400 cursor-pointer p-1 m-2 bg-indigo-600 w-8 h-8";
  };
  return (
    <div className="flex justify-center">
      {arr.map((elm) => (
        <div
          ref={colorRef}
          onClick={() => handleClick(elm + 1)}
          className={`w-8 h-8 rounded-2xl bg-indigo-900 text-white text-center shadow hover:bg-indigo-400 cursor-pointer p-1 m-2`}
        >
          {elm + 1}
        </div>
      ))}
    </div>
  );
}
