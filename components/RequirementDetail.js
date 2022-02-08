import axios from "axios";
import React, { useState } from "react";
import Link from "next/link";
import Modal from "./Modal";
import { useRouter } from "next/router";

const RequirementDetail = ({
  reqDetail,
  project,
  setIsRefreshing,
  user,
  setReqDetail,
}) => {
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
    setIsRefreshing(true);
  };

  const addEstimation = async (id) => {
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

  const addNote = async (id) => {
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

  const deleteRequirement = async (id, status) => {
    console.log(status);
    if (status === "start") {
      const res = await axios.post("/api/deleteReq", {
        reqId: id,
      });

      if (res.status === 200) {
        refreshData();
        setIsRefreshing(false);
      }
    } else if (status === "inprogress") {
      //pop up a message here
    }
  };
  const reqStatus = async (e, id) => {
    e.preventDefault();

    const res = await axios.put("/api/updateReqStatus", {
      status: "completed",
      requirementId: id,
    });
    if (res.status !== 200) {
      console.log(res, "Something went wrong");
    } else {
      refreshData();
    }
  };

  //delete modal
  let deleteModalActions = [
    {
      text: "Delete",
      func: deleteRequirement,
    },
  ];
  //add estimation modal
  const [estimation, setEstimation] = useState({});
  let estimationModalActions = [
    {
      text: "Add",
      func: addEstimation,
    },
  ];
  //note modal
  const [note, setNote] = useState({});

  let noteModalActions = [
    {
      text: "Add Note",
      func: addNote,
    },
  ];

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Requirement Details
        </h3>
        <div className="flex flex-wrap items-center">
          {reqDetail.status === "start" && (
            <div className="flex justify-center">
              <Link href={`/editRequirement/${reqDetail.id}`} passHref>
                <button className="h-9 px-5 text-lg text-white transition-colors duration-150 bg-indigo-700 rounded-lg ">
                  Edit requirement
                </button>
              </Link>
            </div>
          )}
          {reqDetail.status !== "completed" ? (
            <Modal
              headline="Add Note"
              actions={noteModalActions}
              req={reqDetail}
              disable={false}
              type={"feature"}
            >
              <div className=" mt-4 w-full">
                <textarea
                  rows={4}
                  columns={12}
                  className="appearance-none block w-96 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                  name={reqDetail.id}
                  onChange={(e) =>
                    setNote((prevValues) => ({
                      ...prevValues,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  placeholder="This requirement needs to be complete by monday."
                />
              </div>
            </Modal>
          ) : null}

          {reqDetail.status === "start" ? (
            <Modal
              message="Are you sure you want to delete this requirement ?"
              headline="Delete Requirement"
              actions={deleteModalActions}
              req={reqDetail}
              type={"danger"}
              disable={false}
            />
          ) : null}
          {reqDetail.status === "completed" ? null : (
            <form onSubmit={(e) => reqStatus(e, reqDetail.id)}>
              <button
                disabled={reqDetail.status === "start"}
                className="text-white px-2 p-1 bg-indigo-700 ml-2 rounded-lg text-xl disabled:bg-gray-800 disabled:cursor-not-allowed"
                type="submit"
              >
                Mark as Completed
              </button>
            </form>
          )}
        </div>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Project</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {project.name}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Requirement Details
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {reqDetail.value}
            </dd>
          </div>
          {/* Note section */}
          {reqDetail.notes.length > 0 && (
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Notes</dt>

              {reqDetail.notes.length > 0 && (
                <dd
                  key={note.id}
                  className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1"
                >
                  {reqDetail.notes.length > 0
                    ? reqDetail.notes.map((note) => (
                        <li key={note.id}>{note.value}</li>
                      ))
                    : ""}
                </dd>
              )}
            </div>
          )}

          {/* NOTE SECTION ENDS HERE */}
          {/* estimation section */}
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            {user.role === "maintainer" && reqDetail.estimation.length === 0 ? (
              <Modal
                message="Are you sure you want to delete this requirement ?"
                headline="Add estimation"
                actions={estimationModalActions}
                req={reqDetail}
                disable={false}
                type={"feature"}
              >
                <div className="mt-4">
                  <div className="flex   items-center">
                    <div>
                      <label htmlFor="date" className="font-bold ">
                        Date of completion
                      </label>
                      <input
                        type="date"
                        name={`date_${reqDetail.id}`}
                        id="date"
                        onChange={(e) =>
                          setEstimation((prevValues) => ({
                            ...prevValues,
                            [e.target.name]: e.target.value,
                          }))
                        }
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div className="ml-4">
                      <label htmlFor="time" className="font-bold">
                        Duration of time it will take
                      </label>
                      <input
                        placeholder="2 hours || 2 days ..."
                        name={`time_${reqDetail.id}`}
                        id="time"
                        onChange={(e) =>
                          setEstimation((prevValues) => ({
                            ...prevValues,
                            [e.target.name]: e.target.value,
                          }))
                        }
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                  </div>
                </div>
              </Modal>
            ) : (
              <>
                <dt className="text-sm font-medium text-gray-500">
                  Estimation
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                  <ul>
                    <li>Date : {reqDetail.estimation[0].date}</li>
                    <li>Duration : {reqDetail.estimation[0].time}</li>
                  </ul>
                </dd>
              </>
            )}
          </div>
          {/* ESTIMATION ENDS HERE */}
        </dl>
      </div>
    </div>
  );
};
export default RequirementDetail;
