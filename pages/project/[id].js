import React, { useState, useEffect } from "react";
import AccessDenied from "../../components/AccessDenied";
import Loading from "../../components/Loading";
import { prisma } from '../../lib/prisma';
import { useSession, getSession } from "next-auth/react";
import { EmojiSadIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import Link from "next/link";
import slingShot from "../../public/Slingshot.svg";
import Image from "next/image";
import RequirementDetail from "../../components/RequirementDetail";

function Project({ project, reqs, user }) {
  const { status } = useSession();
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [reqDetail, setReqDetail] = useState(null);

  useEffect(() => {
    setIsRefreshing(false);
  }, [project]);

  useEffect(() => {
    if (reqDetail !== null) {
      let updatedReq = reqs.filter((req) => req.id === reqDetail.id);
      console.log("here", updatedReq);
      console.log("ere", reqDetail);
      if (updatedReq.length >= 1) {
        setReqDetail(updatedReq[0]);
      } else {
        setReqDetail(null);
      }
    } else {
      setReqDetail(null);
    }
  }, [reqs]);

  //**Handle Change for the id */
  const handleChange = (req) => {
    setReqDetail(req);
  };

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "unauthenticated") {
    return <AccessDenied />;
  }
  if (user.role === null) {
    router.push("/ChooseRole");
  }

  if (isRefreshing) {
    return <Loading />;
  }
  //**Make a request to get the id*/
  return (
    <>
      <div className="flex ml-10">
        <h1 className="text-3xl font-bold m-2">{project.name}</h1>
        <button className="h-9 text-white px-2 p-1 bg-indigo-700 mt-3 mb-6 rounded-lg text-xl hover:bg-indigo-800">
          <Link href={`/project/${project.id}/NewRequirement`}>
            Add New Requirement
          </Link>
        </button>
      </div>
      <div className="grid grid-cols-3 gap-3 text-white ml-12 mr-12 rounded-lg  bg-white shadow-lg p-4 mb-14">
        <div className=" col-span-1 overflow-y-auto h-96">
          <h3 className="text-black text-xl font-bold pl-4">Requirements</h3>
          <ul role="list">
            {reqs.map((req) => (
              <li
                key={req.id}
                className="col-span-1 bg-white shadow divide-x divide-gray-900 cursor-pointer hover:bg-gray-100"
                onClick={() => handleChange(req)}
              >
                <div className="w-full flex items-center justify-between p-6 space-x-6">
                  <div className="flex-1 truncate">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-gray-900  text-lg truncate">
                        {req.value}
                      </h3>
                    </div>
                  </div>
                  <Image
                    className="bg-gray-300 rounded-full flex-shrink-0"
                    width="40"
                    height="40"
                    src={slingShot}
                    alt=""
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-2">
          {reqDetail !== null ? (
            <RequirementDetail
              reqDetail={reqDetail}
              project={project}
              setIsRefreshing={setIsRefreshing}
              user={user}
              setReqDetail={setReqDetail}
            />
          ) : (
            <>
              <div className="flex justify-center">
                <h3 className="text-gray-500 p-28">
                  No requirement selected
                  <EmojiSadIcon />
                </h3>
              </div>
            </>
          )}
        </div>
      </div>
      <br />
      <br />
    </>
  );
}

export default Project;

export async function getServerSideProps({ params, req }) {
  const session = await getSession({ req });

  let user;
  if (session !== null) {
    user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
  } else {
    user = null;
  }

  const project = await prisma.project.findUnique({
    where: {
      id: params.id,
    },
    include: {
      requirements: {
        include: {
          notes: true,
          estimation: true,
        },
      },
    },
  });

  return {
    props: {
      project,
      reqs: project.requirements,
      user,
    },
  };
}

//**Original Code**//

// function Project({ project, reqs, user }) {
//   const { status } = useSession();
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   const router = useRouter();

//   const refreshData = () => {
//     router.replace(router.asPath);
//     setIsRefreshing(true);
//   };
//   useEffect(() => {
//     setIsRefreshing(false);
//   }, [project]);

//   const addEstimation = async (e, id, estimation) => {
//     e.preventDefault();

//     const res = await axios.post("/api/addEstimation", {
//       estimation,
//       requirementId: id,
//     });
//     if (res.status !== 200) {
//       console.log(res, "Something went wrong");
//     } else {
//       refreshData();
//     }
//   };
//   const addNote = async (e, id, note) => {
//     e.preventDefault();

//     const res = await axios.post("/api/addNote", {
//       value: note[id],
//       requirementId: id,
//     });
//     if (res.status !== 200) {
//       console.log(res, "Something went wrong");
//     } else {
//       refreshData();
//     }
//   };

//   const reqStatus = async (e, id) => {
//     e.preventDefault();

//     const res = await axios.put("/api/updateReqStatus", {
//       status: "completed",
//       requirementId: id,
//     });
//     if (res.status !== 200) {
//       console.log(res, "Something went wrong");
//     } else {
//       refreshData();
//     }
//   };

//   if (status === "loading") {
//     return <Loading />;
//   }

//   if (status === "unauthenticated") {
//     return <AccessDenied />;
//   }
//   if (user.role === null) {
//     router.push("/ChooseRole");
//   }

//   if (isRefreshing) {
//     return <Loading />;
//   }
//   return (
//     <>
//       <div className=" max-w-4xl mx-auto px-5 p-10 border border-green-400 rounded-lg bg-green-200">
//         <h2 className="text-3xl ">{project.name}</h2>
//         <div className="mt-2 ">
//           <p className="text-ellipsis ">{project.description}</p>
//         </div>
//       </div>

//       <div className=" max-w-4xl mx-auto px-5 p-10 ">
//         <h2 className="text-3xl mb-5 text-white">Requirements</h2>
//         {reqs.length > 0 ? (
//           <Requirement
//             reqs={reqs}
//             user={user}
//             addEstimation={addEstimation}
//             addNote={addNote}
//             reqStatus={reqStatus}
//           />
//         ) : (
//           ""
//         )}

//         <button className="text-white px-2 p-1 bg-green-400 mt-3 mb-6 rounded-lg text-xl">
//           <Link href={`/project/${project.id}/NewRequirement`}>
//             Add New Requirement
//           </Link>
//         </button>
//       </div>
//     </>
//   );
// }
