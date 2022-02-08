import React, { useState } from "react";
import { ShieldExclamationIcon, CheckIcon } from "@heroicons/react/solid";
const Modal = ({
  message,
  actions,
  req,
  disable,
  headline,
  children,
  type,
}) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {type === "feature" ? (
        <button
          className="text-white px-2 p-1 bg-indigo-700  rounded-lg text-xl disabled:bg-gray-800 disabled:cursor-not-allowed ml-2"
          onClick={() => setOpenModal(true)}
          disabled={disable}
        >
          {headline}
        </button>
      ) : (
        <button
          className="text-white px-2 p-1 bg-red-400  rounded-lg text-xl disabled:bg-gray-800 disabled:cursor-not-allowed ml-2"
          onClick={() => setOpenModal(true)}
          disabled={disable}
        >
          {headline}
        </button>
      )}
      {openModal ? (
        <>
          <div
            className="fixed z-10 inset-0 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"
              />
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                ​
              </span>

              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => setOpenModal(false)}
                  >
                    <span className="sr-only">Close</span>

                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="sm:flex sm:items-start">
                  <div
                    className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full  sm:mx-0 sm:h-10 sm:w-10`}
                  >
                    {type === "feature" ? (
                      <CheckIcon className="fill-indigo-700" />
                    ) : (
                      <ShieldExclamationIcon className="fill-red-700" />
                    )}
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      {headline}
                    </h3>
                    <div className="mt-2 text-gray-900">
                      {children ? children : message}
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  {actions
                    ? actions.map((action) => (
                        <button
                          className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-700 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm`}
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

                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => setOpenModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
