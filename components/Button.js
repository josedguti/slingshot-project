import React from "react";

function Button({ ver, text, type, classes, submitFunction }) {
  if (ver === "dark") {
    return (
      <button
        type={type}
        className={`text-2xl px-2 bg-gray-700 p-1 rounded-lg text-white  hover:bg-gray-600 ${classes}`}
        onClick={() => submitFunction()}
      >
        {text}
      </button>
    );
  } else if (ver === "green") {
    return (
      <button
        type={type}
        className={`text-white px-2 p-1 bg-green-400 mt-4 rounded-lg text-xl ${classes}`}
        onClick={() => submitFunction()}
      >
        {text}
      </button>
    );
  } else if (ver === "red") {
    return (
      <button
        type={type}
        className={`text-white px-2 p-1 bg-red-400 mt-4 rounded-lg text-xl ${classes}`}
        onClick={() => submitFunction()}
      >
        {text}
      </button>
    );
  }
}

export default Button;
