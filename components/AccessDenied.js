import React from "react";
import { signIn } from "next-auth/react";
function AccessDenied() {
  return (
    <div className="container mx-auto flex px-10 lg:px-40 py-10 -mb-32 items-center justify-center flex-col">
      <div className=" bg-green-400 p-10 rounded align-center">
        <p className="text-2xl">Access Denied</p>
        <button
          className="text-1xl bg-gray-700 p-1 px-2 rounded-lg text-white  hover:bg-gray-600 mt-4"
          onClick={() => signIn()}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

export default AccessDenied;
