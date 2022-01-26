import React, { useState } from "react";
import Image from "next/image";
import Add from "../public/add.png";
import Minus from "../public/minus.png";
import nextId from "react-id-generator";
import { useSession } from "next-auth/react";
import AccessDenied from "../components/AccessDenied";
import axios from "axios";
import { useRouter } from "next/router";
import Button from "../components/Button";

function CreateProject() {
  const [reqs, setReqs] = useState([]);
  const { status } = useSession();

  const router = useRouter();

  const [params, setParams] = useState({
    projectName: "",
    description: "",
  });

  const increaseReq = () => {
    let id = nextId();
    setReqs((prevreq) => [...prevreq, { id, value: " " }]);
  };
  const popReq = (id) => {
    setReqs((prevReq) => prevReq.filter((req) => req.id !== id));
  };

  const handleInputChange = ({ target }) => {
    setParams((prevParams) => ({ ...prevParams, [target.name]: target.value }));
  };

  const handleRequirementChange = (id, e) => {
    setReqs((prevReq) =>
      prevReq.map((req) => {
        if (req.id === id) {
          req.value = e.target.value;
          return req;
        } else {
          return req;
        }
      })
    );
  };
  //submit to database
  const onSub = async (e) => {
    e.preventDefault();

    const res = await axios.post("/api/createProject", {
      pname: params.projectName,
      description: params.description,
    });
    //throw error here
    if (!res.ok) {
      console.log(res, "this is sent");
    }

    //loop throug reqs and create req
    let projectId = res.data.id;
    if (reqs.length > 0) {
      reqs.map(
        async (r) =>
          await axios.post("/api/createReq", {
            value: r.value,
            projectId,
          })
      );
    }
    router.push(`/project/${projectId}`);
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
        <h3 className="text-3xl">Create a project</h3>
        <form onSubmit={(e) => onSub(e)}>
          <div>
            <label className="block mt-4" htmlFor="pname">
              Project name
            </label>
            <input
              className="mt-1 w-80  block  px-3 py-2 bg-white border border-gray-300 rounded-md  "
              type="text"
              name="projectName"
              id="pname"
              required
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="desc">Describe Project</label>
            <textarea
              className="mt-1 w-80   block px-3 py-2 bg-white border border-gray-300 rounded-md "
              type="text"
              name="description"
              id="desc"
              required
              onChange={(e) => handleInputChange(e)}
            />
          </div>

          <div>
            {reqs.map((item) => (
              <div className="mt-4" key={item.id}>
                <label className="flex item-center">
                  <span className="mr-3">Requirement</span>
                  <Image
                    src={Minus}
                    width={25}
                    height={25}
                    className="cursor-pointer"
                    onClick={(e) => popReq(item.id)}
                    alt="minus image to decrease number of requirement input"
                  />
                </label>
                <textarea
                  className="mt-1 w-80  block  px-3 py-2 bg-white border border-gray-300 rounded-md"
                  name={item.id}
                  required
                  onChange={(e) => handleRequirementChange(item.id, e)}
                />
              </div>
            ))}
          </div>
          <div className="mt-4">
            <span
              className="flex items-center cursor-pointer"
              onClick={increaseReq}
            >
              <span className="mr-3">Requirements</span>
              <Image
                src={Add}
                width={25}
                height={25}
                alt="add image to increase number of requirement input"
              />
            </span>
          </div>
          <div className="mt-4">
            <button
              className="text-2xl px-2 bg-gray-700 p-1 rounded-lg text-white  hover:bg-gray-600  mt-4 rounded-lg text-xl"
              type="submit"
            >
              {" "}
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProject;
