import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import slingShot from "../public/Slingshot.svg";
import paperAirplane from "../public/paperAirPlane.jpg";
import { signIn, useSession } from "next-auth/react";

export default function index() {
  const { data: session } = useSession();
  return (
    <div className="min-h-full flex h-full h-screen">
      <Head>
        <title>Slingshot</title>
        <meta
          name="description"
          content="Create your projects and add requirements"
        />
        <link rel="slingshot" href="/favicon.ico" />
      </Head>
      <div className=" h-full flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <div>
              <Image
                className="h-12 w-auto"
                width={60}
                height={60}
                src={slingShot}
                alt="Workflow"
              />
            </div>

            <h1 className=" text-center text-7xl font-extrabold text-indigo-700 ">
              Slingshot
            </h1>
            <p className="mt-4 ml-7 font-bold">
              Project Management System Developed by Dabble Lab
            </p>
          </div>

          <div className="mt-8">
            <div>
              <div>
                <div>
                  {" "}
                  <div>
                    <p className=" text-center text-lg font-medium text-gray-700 p-5 text-black">
                      Create a Project
                    </p>
                    <Link href="/CreateProject">
                      <div className="cursor-pointer w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-500 bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                        <span className="sr-only">Create a Project</span>
                        <svg
                          stroke="currentColor"
                          className="w-5 h-5"
                          aria-hidden="true"
                          fill="none"
                          viewBox="0 0 20 20"
                          color="white"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {!session ? (
              <>
                <div className="mt-6 relative">
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="w-full border-t border-gray-300 mt-6" />
                  </div>
                </div>
                <div className="mt-6 mb-6"></div>

                <div>
                  <p className="text-center text-lg font-medium text-gray-700 p-5 text-black">
                    Sign In
                  </p>
                  <button
                    onClick={() => signIn()}
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Sign in with GitHub</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      color="black"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1 bg-blue-800 content-center">
        <div>
          <Image src={paperAirplane} layout="fill" alt="paperAirplane" />
          {/* <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://media.istockphoto.com/photos/different-approach-different-direction-picture-id1301406955?b=1&k=20&m=1301406955&s=170667a&w=0&h=gK1rdgyAKxit2vyNzMAtftj97AFuygEZjFw01iadoxo="
            alt=""
          /> */}
        </div>
      </div>
    </div>
  );
}

//**Original Index Home **//
// {
/* <div className="container">
  <div className="grid grid-cols-1 px-20 pt-28 justify-items-center lg:grid-cols-2">
    <div className="ml-8 mx-auto  lg:pl-9">
      <Image src={slingShot} alt="slingshot image" />
    </div>
    <div className="flex flex-col justify-center">
      <h2 className=" text-white lg:pl-10 text-7xl font-semibold  text-center ">
        Shoot your shot and start your new project with
        <span className="relative  text-4xl">
          <span className="block absolute -inset-1 -skew-y-3 bg-green-500"></span>
          <span className="relative text-white"> Slingshot</span>
        </span>
      </h2>
      <div className="mt-10 flex justify-center ">
        <button className="text-3xl  bg-green-500 p-2  rounded-lg text-white  hover:bg-green-400">
          <Link href="/CreateProject">Start a project</Link>
        </button>
      </div>
    </div>
  </div>
</div>; */
// }
