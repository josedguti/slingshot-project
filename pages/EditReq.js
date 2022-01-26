import React, { useState } from "react";
import Button from "../components/Button";
import Link from "next/link";
import { useSession, getSession } from "next-auth/react";
import Loading from "../components/Loading";
import { PrismaClient } from "@prisma/client";
function EditReq({ reqs, user }) {
  const { status } = useSession();
  console.log(status);
   if (status === "loading") {
     return <Loading />;
   }
  return (
    <>
      <h1 className="max-w-4xl mt-10 mx-auto text-center text-lg px-5 p-10 border border-green-400 rounded-lg bg-green-200">
        Edit Requirement details from previous page
      </h1>
      <form className="mt-5">
        <div className="mb-5 p-4 rounded-xl text-white ">
          <div className="max-w-4xl mx-auto text-center text-lg px-5 p-10 rounded-lg bg-gray-700">
            <div>
              <h1 className="text-white text-center text-xl">
                {" "}
                Update Requirement
              </h1>
            </div>
            <div className="p-10 flex bg-gray-700 rounded-lg    flex items-center justify-around ">
              <div>
                <input
                  className="mt-1 w-80  block  px-3 py-2 bg-white border border-gray-300 rounded-md  "
                  type="text"
                  name="projectName"
                  id="pname"
                  required
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div>
                <Link href={""} passHref>
                  <Button text={"update"} ver="green" type={"submit"} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
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
