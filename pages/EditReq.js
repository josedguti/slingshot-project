import React, { useState } from "react";
import Button from "../components/Button";
import Link from "next/link";
import { useSession, getSession } from "next-auth/react";
import Loading from "../components/Loading";
import { prisma } from "../lib/prisma";


function EditReq({ reqs, user }) {
  const { status } = useSession();
  console.log(status);
   if (status === "loading") {
     return <Loading />;
   }
  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Update Requirement
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={(e) => onSub(e)}>
            <div>
              <label
                for="updaterequirement"
                className="block text-sm font-medium text-gray-700"
              >
                Update your requirement
              </label>
              <div class="mt-1">
                <textarea
                type='text'
                  onChange={(e) => handleInputChange(e)}
                  rows="4"
                  name="projectName"
                  id="pname"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                ></textarea>
              </div>
            </div>
            <div>
              <Link href={""} passHref>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                Update
              </button>
                </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
    // <>
    //   <h1 className="max-w-4xl mt-10 mx-auto text-center text-lg px-5 p-10 border border-green-400 rounded-lg bg-green-200">
    //     Edit Requirement details from previous page
    //   </h1>
    //   <form className="mt-5">
    //     <div className="mb-5 p-4 rounded-xl text-white ">
    //       <div className="max-w-4xl mx-auto text-center text-lg px-5 p-10 rounded-lg bg-gray-700">
    //         <div>
    //           <h1 className="text-white text-center text-xl">
    //             {" "}
    //             Update Requirement
    //           </h1>
    //         </div>
    //         <div className="p-10 flex bg-gray-700 rounded-lg    flex items-center justify-around ">
    //           <div>
    //             <input
    //               className="mt-1 w-80  block  px-3 py-2 bg-white border border-gray-300 rounded-md  "
    //               type="text"
    //               name="projectName"
    //               id="pname"
    //               required
    //               onChange={(e) => handleInputChange(e)}
    //             />
    //           </div>
    //           <div>
    //             <Link href={""} passHref>
    //               <Button text={"update"} ver="green" type={"submit"} />
    //             </Link>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </form>
    // </>
  );
}


export default EditReq;

// export async function getServerSideProps({ params, req }) {
//   const session = await getSession({ req });

//   let user;
//   const prisma = new PrismaClient();
//   if (session !== null) {
//     user = await prisma.user.findUnique({
//       where: {
//         email: session.user.email,
//       },
//     });
//   } else {
//     user = null;
//   }

//   const project = await prisma.project.findUnique({
//     where: {
//       id: params.id,
//     },
//     include: {
//       requirements: {
//         include: {
//           notes: true,
//           estimation: true,
//         },
//       },
//     },
//   });

//   return {
//     props: {
//       project,
//       reqs: project.requirements,
//       user,
//     },
//   };
// }
