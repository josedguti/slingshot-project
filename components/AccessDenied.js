import React from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import paperAirPlane from "../public/paperAirPlane.jpg"
import slingShot from "../public/Slingshot.svg";

function AccessDenied() {
  return (
    <>
    
      <div className="min-h-full px-4 py-16 sm:px-6  md:grid md:place-items-center lg:px-8">
        <div className="flex-grow flex flex-col">
          <main className="flex-grow flex flex-col">
            <div className="flex-grow mx-auto max-w-7xl w-full flex flex-col px-4 sm:px-6 lg:px-8">
              <div className="flex-shrink-0 pt-10 sm:pt-16">
                <a href="/" className="inline-flex">
                <Image
                    width={80}
                    height={80}
                    src={slingShot}
                    alt=""
                  />
                </a>
              </div>
              <div className="flex-shrink-0 my-auto">
                <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                  Access Denied
                </h1>
                <p className="mt-2 text-base text-gray-500">
                  Sorry, but you can&apos;t continue without Signing In
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => signIn()}
                    className="text-base font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Sign In<span aria-hidden="true"> &rarr;</span>
                  </button>
                </div>
              </div>
            </div>
          </main>
          
        </div>
        
      </div>
    </>
  );
}

export default AccessDenied;
