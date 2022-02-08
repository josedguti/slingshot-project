import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";
import { useRouter } from "next/router";
import AccessDenied from "../../../components/AccessDenied";
import Loading from "../../../components/Loading";
import axios from "axios";

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
    return <Loading />;
  }

  if (status === "unauthenticated") {
    return <AccessDenied />;
  }
  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={(e) => onSub(e)}>
            <div>
              <h2 className="mb-5  text-2xl font-bold text-gray-900">
                Add New Requirement
              </h2>
              <div class="mt-1">
                <textarea
                  rows="4"
                  name="value"
                  required
                  onChange={(e) => {
                    setParams({ ...params, value: e.target.value });
                  }}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                ></textarea>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
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
