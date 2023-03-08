import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import "./GradientBG.css";
function AccessCode({ theme }) {
  const location = useLocation();
  const navigate = useNavigate();
  const surveyId = location.state.id;
  const HomeIcon = <FontAwesomeIcon icon={faHome} />;
  const baseURL = "https://surveyconnect-server.onrender.com";
  const [accessBody, setAccessBody] = useState({
    surveyId: surveyId,
    accessCode: "",
    errorMessage: "",
  });
  const [accessCodeError, setAccessCodeError] = useState(false);
  const saveCode = (e) => {
    setAccessBody((oldData) => {
      return {
        ...oldData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const verifyAccess = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const requestHeaders = {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    };

    const res = await fetch(`${baseURL}/survey/verifyaccess`, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(accessBody),
    });
    const data = await res.json();
    console.log(data);
    if (data._id) {
      navigate("/survey/asl", { state: { survey: data } });
    } else {
      setAccessBody((oldData) => {
        return {
          ...oldData,
          errorMessage: data.errorMessage,
        };
      });
      setAccessCodeError(true);
    }
  };
  return (
    <div
      className={
        theme
          ? "dark-background h-screen flex jsutify-center"
          : "background h-screen flex justify-center"
      }
    >
      <div className="w-5/6 md:w-2/3 lg:w-1/2 xl:w-1/3 bg-slate-800/[0.5] dark:bg-transparent dark:border dark:border-slate-800 dark:shadow-2xl text-white mx-auto my-auto h-1/2 rounded-xl p-5 bg-sky-50">
        <div className="text-center mt-16">
          <h3 className="font-bold text-xl">
            Survey Name: {location.state.surveyName}
          </h3>
          <p className="mt-5">
            This is a private survey. Please enter the access code to continue.
          </p>
        </div>
        <form
          className="text-center mt-12 flex flex-col w-2/3  mx-auto"
          onSubmit={(e) => verifyAccess(e)}
        >
          {accessCodeError && (
            <div
              id="toast-danger"
              className="flex items-center w-full p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
              role="alert"
            >
              <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Error icon</span>
              </div>
              <div className="ml-3 text-sm font-normal">
                {accessBody.errorMessage}
              </div>
              <button
                type="button"
                className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                data-dismiss-target="#toast-danger"
                aria-label="Close"
                onClick={() => {
                  setAccessCodeError(false);
                }}
              >
                <span className="sr-only">Close</span>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          )}

          <input
            type="text"
            className="rounded-xl px-5 h-10 text-center text-black border-transparent"
            placeholder="Enter Access Code"
            value={accessBody.accessCode}
            name="accessCode"
            onChange={(e) => saveCode(e)}
          />
          <button
            type="button"
            className=" mt-5 rounded-xl active:bg-cyan-800/75 bg-zinc-900/75 h-10 text-sky-100"
            onClick={(e) => verifyAccess(e)}
          >
            Continue
          </button>
          <a href="/dashboard" className="text-sky-100 text-center mt-5">
            {HomeIcon}
          </a>
        </form>
      </div>
    </div>
  );
}

export default AccessCode;
