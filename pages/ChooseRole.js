import React, { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import AccessDenied from "../components/AccessDenied";
import Loading from "../components/Loading";

function ChooseRole() {
  const [role, setRole] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleUserUpdate = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/updateUser", {
      email: session.user.email,
      role,
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
          <form onSubmit={(e) => handleUserUpdate(e)}>
            <h2 className="text-4xl bold">Choose your role.</h2>
            <fieldset className="mt-3">
              <legend className="sr-only">Notification method</legend>
              <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10 m-3">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="role1"
                    name="role"
                    value="client"
                    required
                    onChange={(e) => setRole(e.target.value)}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label
                    htmlFor="role1"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    Client
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    id="role2"
                    name="role"
                    value="maintainer"
                    onChange={(e) => setRole(e.target.value)}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label
                    htmlFor="role1"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    Maintainer
                  </label>
                </div>
              </div>
            </fieldset>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChooseRole;
