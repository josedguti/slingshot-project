import axios from "axios";
import React, { useState } from "react";
import Button from "./Button";
import Link from "next/link";
import Modal from "./Modal";
import { useRouter } from "next/router";
import Loading from "./Loading";

function Requirement({ reqs, user, addNote, addEstimation, reqStatus }) {
  const [estimation, setEstimation] = useState({});
  const [note, setNote] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();

  const refreshData = () => {
    setIsRefreshing(true);
    router.replace(router.asPath);
    setIsRefreshing(false);
  };

  const deleteRequirement = async (id, status) => {
    if (status === "start") {
      const res = await axios.post("/api/deleteReq", {
        reqId: id,
      });

      if (res.status === 200) {
        refreshData();
      }
    } else if (status === "inprogress") {
      //pop up a message here
    }
  };

  let modalActions = [
    {
      text: "Delete",
      func: deleteRequirement,
      actionColor: "green",
    },
  ];

  if (isRefreshing) {
    return <Loading />;
  }

  return (
    <>
      {reqs.map((req) => (
        <div key={req.id}>
          <div className="mb-5 p-4 rounded-xl text-white">
            <div className="mb-8 grid grid-row">
              <div className="p-4 border  bg-gray-700   rounded-lg">
                <div className="flex items-center justify-between">
                  <p className="text-2xl ">{req.value}</p>

                  <Modal
                    message="Are you sure you want to delete this requirement ?"
                    actions={modalActions}
                    req={req}
                    disable={false}
                  />
                </div>
                {req.status === "completed" ? null : (
                  <div className="flex justify-end">
                    <Link href={""} passHref>
                      <Button text={"edit"} ver="green" type={"submit"} />
                    </Link>
                  </div>
                )}

                {req.estimation.length > 0 ? (
                  <p className="text-1xl mt-6 font-bold bg-green-200  p-2 rounded-lg text-gray-600 inline-block">
                    Date : {req.estimation[0].date}, Duration :{" "}
                    {req.estimation[0].time}
                  </p>
                ) : (
                  ""
                )}
                <div className="mt-8">
                  {req.notes.length > 0 && (
                    <h3 className="text-2xl font-bold">Notes</h3>
                  )}
                  {req.notes.length > 0
                    ? req.notes.map((note) => (
                        <div key={note.id}>
                          <li>{note.value}</li>
                        </div>
                      ))
                    : ""}
                </div>
              </div>

              <div className="mt-2">
                {user.role === "maintainer" && req.estimation.length === 0 ? (
                  <form
                    onSubmit={(e) => addEstimation(e, req.id, estimation)}
                    className="bg-gray-600 p-2 mt-2 rounded-xl"
                  >
                    <div className="mt-4">
                      <h2 className="font-bold">
                        Please Enter estimation time and date
                      </h2>
                      <div className="flex  rounded-lg p-3 items-center">
                        <div>
                          <label
                            htmlFor="date"
                            className="font-bold text-white"
                          >
                            Date of completion
                          </label>
                          <input
                            type="date"
                            name={`date_${req.id}`}
                            id="date"
                            onChange={(e) =>
                              setEstimation((prevValues) => ({
                                ...prevValues,
                                [e.target.name]: e.target.value,
                              }))
                            }
                            className="mt-1 block pl-2 pr-2 py-3  border border-gray-300 rounded-md bg-gray-800 "
                            required
                          />
                        </div>
                        <div className="ml-4">
                          <label
                            htmlFor="time"
                            className="font-bold text-white"
                          >
                            Duration of time it will take
                          </label>
                          <input
                            placeholder="2 hours || 2 days ..."
                            name={`time_${req.id}`}
                            id="time"
                            onChange={(e) =>
                              setEstimation((prevValues) => ({
                                ...prevValues,
                                [e.target.name]: e.target.value,
                              }))
                            }
                            className="mt-1 block pl-2 pr-2 py-3  border border-gray-300 rounded-md bg-gray-800 "
                            required
                          />
                        </div>
                        <button
                          className="text-white px-2 p-1 bg-green-400 mt-4 rounded-lg text-xl"
                          type={"submit"}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                ) : (
                  ""
                )}
                {req.status === "completed" ? null : (
                  <form
                    onSubmit={(e) => addNote(e, req.id, note)}
                    className="bg-gray-600 p-2 mt-2 rounded-xl"
                  >
                    <div className="mt-2">
                      <div>
                        <label className="font-bold text-white">Add Note</label>
                        <textarea
                          className="mt-1 block mr-3  px-3 py-2  border border-gray-300 rounded-md  resize-y w-full block  bg-gray-800"
                          required
                          name={req.id}
                          onChange={(e) =>
                            setNote((prevValues) => ({
                              ...prevValues,
                              [e.target.name]: e.target.value,
                            }))
                          }
                          placeholder="This requirement needs to be complete by monday."
                        />
                      </div>
                      <button
                        type={"submit"}
                        className="text-white px-2 p-1 bg-green-400 mt-4 rounded-lg text-xl"
                      >
                        submit
                      </button>
                    </div>
                  </form>
                )}
                {req.status === "completed" ? null : (
                  <form onSubmit={(e) => reqStatus(e, req.id)}>
                    <button
                      disabled={req.status === "start"}
                      className="text-white px-2 p-1 bg-green-400 mt-4 rounded-lg text-xl disabled:bg-gray-800 disabled:cursor-not-allowed"
                      type="submit"
                    >
                      Mask as Completed
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Requirement;
