import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";
import AccessDenied from "../../../components/AccessDenied";
import axios from "axios";
import { useRouter } from "next/router";

const prisma = new PrismaClient();

export default function NewRequirement({ project }) {
  const { status } = useSession();
  const [params, setParams] = useState({});

  const router = useRouter();

  //submit to database
  const onSub = async (e) => {
    e.preventDefault();

    const projectId = project.id;

    const res = await axios.post("/api/createReq", {
      value: params.value,
      projectId,
    });

    if (!res.ok) {
      console.log(res, "this is sent");
    }

    router.back();
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <AccessDenied />;
  }
  return (
    <div className="container mx-auto flex px-10 lg:px-40 py-10 -mb-32 items-center justify-center flex-col">
      <div className=" bg-green-400 p-10 rounded">
        <h3 className="text-3xl">Add New Requirement</h3>
        <form onSubmit={(e) => onSub(e)}>
          <div></div>
          <div>
            <div className="mt-4">
              <textarea
                className="mt-1 w-80  block  px-3 py-2 bg-white border border-gray-300 rounded-md"
                name="value"
                required
                onChange={(e) => {
                  setParams({ ...params, value: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="mt-4">
            <button
              className="text-white px-2 p-1 bg-green-400 mt-4 rounded-lg text-xl bg-gray-900"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const project = await prisma.project.findUnique({
    where: {
      id: id,
    },
  });
  return {
    props: {
      project,
    },
  };
}
