import React, { useState, useEffect } from "react";
import AccessDenied from "../../components/AccessDenied";
import Loading from "../../components/Loading";
import { PrismaClient } from "@prisma/client";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import Requirement from "../../components/Requirement";
import Link from "next/link";

function Project({ project, reqs, user }) {
  const { status } = useSession();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
    setIsRefreshing(true);
  };
  useEffect(() => {
    setIsRefreshing(false);
  }, [project]);

  const addEstimation = async (e, id, estimation) => {
    e.preventDefault();

    const res = await axios.post("/api/addEstimation", {
      estimation,
      requirementId: id,
    });
    if (res.status !== 200) {
      console.log(res, "Something went wrong");
    } else {
      refreshData();
    }
  };
  const addNote = async (e, id, note) => {
    e.preventDefault();

    const res = await axios.post("/api/addNote", {
      value: note[id],
      requirementId: id,
    });
    if (res.status !== 200) {
      console.log(res, "Something went wrong");
    } else {
      refreshData();
    }
  };

  const reqStatus = async (e , id) => {
    e.preventDefault()
    
    const res = await axios.put("/api/updateReqStatus", {
      status : 'completed',
      requirementId: id,
    });
    if (res.status !== 200) {
      console.log(res, "Something went wrong");
    } else {
    refreshData();
    }
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
  return (
    <>
      <div className=" max-w-4xl mx-auto px-5 p-10 border border-green-400 rounded-lg bg-green-200">
        <h2 className="text-3xl ">{project.name}</h2>
        <div className="mt-2 ">
          <p className="text-ellipsis ">{project.description}</p>
        </div>
      </div>

      <div className=" max-w-4xl mx-auto px-5 p-10 ">
        <h2 className="text-3xl mb-5 text-white">Requirements</h2>
        {reqs.length > 0 ? (
          <Requirement
            reqs={reqs}
            user={user}
            addEstimation={addEstimation}
            addNote={addNote}
            reqStatus={reqStatus}
          />
        ) : (
          ""
        )}

        <button className="text-white px-2 p-1 bg-green-400 mt-3 mb-6 rounded-lg text-xl">
          <Link href={`/project/${project.id}/NewRequirement`}>
            Add New Requirement
          </Link>
        </button>
      </div>
    </>
  );
}

export default Project;

export async function getServerSideProps({ params, req }) {
  const session = await getSession({ req });

  let user;
  const prisma = new PrismaClient();
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
