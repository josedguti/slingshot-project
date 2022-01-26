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
    //how to route back to specific project?
    router.back();
  };

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "unauthenticated") {
    return <AccessDenied />;
  }
  return (
    <div className="container mx-auto flex px-10 lg:px-40 py-10 -mb-32 items-center justify-center flex-col ">
      <form onSubmit={(e) => handleUserUpdate(e)}>
        <div className=" bg-green-400 p-10 rounded">
          <h2 className="text-4xl bold">Choose your role.</h2>
          <div className="mt-4">
            <label className="mr-2">Client</label>
            <input
              type="radio"
              id="role1"
              name="role"
              value="client"
              required
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <div>
            <label className="mr-2">Maintainer</label>
            <input
              type="radio"
              id="role2"
              name="role"
              value="maintainer"
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <button className="text-1xl bg-gray-700 p-1 px-2 rounded-lg text-white  hover:bg-gray-600 mt-4">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChooseRole;
