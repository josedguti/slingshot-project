import React, { useState } from "react";
import { useSession } from "next-auth/react";
import AccessDenied from "../components/AccessDenied";
import axios from "axios";
import { useRouter } from "next/router";
import Loading from "../components/Loading";

const CreateProject = () => {
  const { status } = useSession();
  const router = useRouter();
  const [params, setParams] = useState({ projectName: "", description: "" });
  const handleInputChange = ({ target }) => {
    setParams((prevParams) => ({ ...prevParams, [target.name]: target.value }));
  };
  //submit to database
  const onSub = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/createProject", {
      pname: params.projectName,
      description: params.description,
    });

    if (res.status === 200) {
      let projectId = res.data.id;
      router.push(`/project/${projectId}`);
    } else {
      //throw error here
      //prompt
      console.log(res);
    }
  };
  if (status === "loading") {
    return <Loading />;
  }
  if (status === "unauthenticated") {
    return <AccessDenied />;
  }
  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create a new project
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={(e) => onSub(e)}>
            <div>
              <label
                for="projectName"
                className="block text-sm font-medium text-gray-700"
              >
                Project Name
              </label>
              <div className="mt-1">
                <input
                  onChange={(e) => handleInputChange(e)}
                  id="projectName"
                  name="projectName"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                for="description"
                className="block text-sm font-medium text-gray-700"
              >
                Project description
              </label>
              <div class="mt-1">
                <textarea
                  onChange={(e) => handleInputChange(e)}
                  rows="4"
                  name="description"
                  id="description"
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
};
export default CreateProject;
