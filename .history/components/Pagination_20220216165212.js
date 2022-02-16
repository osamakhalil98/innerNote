import React, { useEffect, useState, useRef } from "react";

export default function Pagination({ totalPages, currentPage, requestedPg }) {
  let arr = Array.from(Array(totalPages).keys());
  const colorRef = useRef("bg-indigo-900");
  const [current, setCurrent] = useState(currentPage);
  const SELECTEDCOLOR = "bg-indigo-600";
  const NONSELCTEDCOLOR = "bg-indigo-900";

  const handleClick = function (currentPg) {
    if (current !== currentPg) {
    }
    setCurrent(currentPg);
  };
  return (
    <div className="flex justify-center">
      {arr.map((elm) => (
        <div
          ref={colorRef}
          onClick={() => handleClick(elm + 1)}
          requested={requestedPg(elm + 1)}
          className={`w-8 h-8 rounded-2xl ${
            elm + 1 === current ? SELECTEDCOLOR : NONSELCTEDCOLOR
          } text-white text-center shadow hover:bg-indigo-400 cursor-pointer p-1 m-2`}
        >
          {elm + 1}
        </div>
      ))}
    </div>
  );
}
