import React, { useState } from "react";

const Modal = ({ message, actions, req }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <button
        className="text-white px-2 p-1 bg-red-400 mt-4 rounded-lg text-xl disabled:bg-gray-800 disabled:cursor-not-allowed "
        onClick={() => setOpenModal(true)}
      >
        Delete requirement
      </button>
      {openModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-gray-900 text-lg ">{message}</p>
                </div>

                <div className="flex items-center justify-end p-4 border-t border-solid border-gray-200 rounded-b">
                  <button
                    className="text-red-500  outline  font-bold outline-1   outline-red-400 px-4 py-1 rounded-lg text-lg  mr-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setOpenModal(false)}
                  >
                    Close
                  </button>
                  {actions
                    ? actions.map((action) => (
                        <button
                          className={`text-white  bg-${action.actionColor}-400 ml-2 rounded-lg text-xl  text-white  font-bold  text-lg px-4 py-1 rounded    ease-linear transition-all duration-150`}
                          type="button"
                          onClick={() => {
                            setOpenModal(false);
                            action.func(req.id, req.status);
                          }}
                          key={action.text}
                        >
                          {action.text}
                        </button>
                      ))
                    : null}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-60 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
