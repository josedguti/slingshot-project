import React, { useState } from "react";
import { useSession, getSession } from "next-auth/react";
import Loading from "../../components/Loading";
import { prisma } from '../../lib/prisma';
import { stringify } from "postcss";
import { useRouter } from "next/router";
import axios from "axios";
//Need to pass requirement ID
//Want to also pass requirement.val to display
//get serverside props hook
function EditReq({ requirement }) {
  const router = useRouter();
  const [params, setParams] = useState({updateRequirement: requirement.value});
  console.log(params, "----params");
  const { status } = useSession();
  console.log(status);
  console.log(requirement);
  if (status === "loading") {
    return <Loading />;
  }

  const handleInputChange = ({ target }) => {
    setParams((prevParams) => ({
      ...prevParams,
      [target.name]: target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.put("/api/createReq", {
      // reqId:
      requirementId: requirement.id,
      value: params.updateRequirement,
    });
    if (res.status === 200) {
      router.back();
    }
  };
 
  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Update Requirement
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={(e) => onSubmit(e)}>
              <div>
                <label
                  for="updaterequirement"
                  className="block text-sm font-medium text-gray-700"
                >
                  Update your requirement
                </label>
                <div class="mt-1">
                  <textarea
                  value={params.updateRequirement}
                    type="text"
                    onChange={(e) => handleInputChange(e)}
                    rows="4"
                    name="updateRequirement"
                    id="pname"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  ></textarea>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditReq;

export async function getServerSideProps({ params, req }) {
  const requirement = await prisma.requirement.findUnique({
    where: {
      id: params.id,
    },
  });
  return {
    props: {
      requirement,
    },
  };
}
