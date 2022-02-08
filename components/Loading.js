import React from "react";

function Loading() {
  return (
    <div className=" flex justify-center items-center">
      <div className="animate-spin rounded-full h-48 w-48 border-b-8 border-indigo-900"></div>
    </div>
  );
}

export default Loading;
