import React from "react";

export default function Pagination({ totalPages }) {
  let arr = [];

  for (let i = 1; i <= totalPages; i++) {
    arr.push[i];
  }
  return (
    <div className="flex justify-center">
      <div className="w-8 h-8 bg-indigo-900 pagination-box shadow hover:bg-indigo-400 cursor-pointer p-1">
        1
      </div>
    </div>
  );
}
