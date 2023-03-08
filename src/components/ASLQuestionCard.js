import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const home = <FontAwesomeIcon icon={faHome} />;
const token = localStorage.getItem("token");
const baseURL = "https://surveyconnect-server.onrender.com";
const emailFormatRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function QuestionCard({ survey }) {
  const [error, setError] = useState({ message: "", valid: true });
  const [questionNum, setQuestionNum] = useState(0);
  const questions = survey.questions.map((q) => {
    return q.question;
  });
  const surveyID = survey._id;
  const initialResponse = {};
  for (const question of questions) {
    initialResponse[question] = {};
  }

  //Survey response
  const [response, setResponse] = useState(initialResponse);
  const start = Date.now();
  const currentQuestion = survey.questions[questionNum].question;

  const navigate = useNavigate();

  const nextQuestion = () => {
    const time = (Date.now() - start) / 1000;
    const obj = {
      ...response,
      [currentQuestion]: {
        ...response[currentQuestion],

        [`Question ${questionNum + 1}`]: {
          ...response[currentQuestion][`Question ${questionNum + 1}`],
          time: `${time.toFixed(3)} seconds`,
        },
      },
    };

    if (questionNum < survey.questions.length - 1) setResponse(obj);
    setQuestionNum((oldQIndex) => (oldQIndex += 1));
  };

  const saveResponse = (e) => {
    const obj = {
      ...response,
      [currentQuestion]: {
        ...response[currentQuestion],

        [`Question ${questionNum + 1}`]: {
          ...response[currentQuestion][`Question ${questionNum + 1}`],
          [e.target.name]: e.target.value,
        },
      },
    };

    setResponse(obj);
  };
  const submitResponse = async () => {
    const requestHeaders = {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
      surveyID: surveyID,
    };
    const res = await fetch(`${baseURL}/response/submitresponse`, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(response),
    });
    const data = await res.json();
    if (data.status === "Success") {
      navigate("/response-success");
    } else {
      navigate("/error");
    }
  };
  const navigateHome = () => {
    const res = window.confirm(
      "Are you sure you want to return? All your progress will be lost."
    );
    if (res) {
      navigate("/dashboard");
    }
    return;
  };
  const verifyEmail = async () => {
    const email = { email: response[currentQuestion]["Question 1"].email };

    if (emailFormatRegex.test(email.email)) {
      const res = await fetch(
        `${baseURL}/response/submitresponse/verifyemail`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(email),
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.message === "Email OK") {
        setQuestionNum((oldQNum) => (oldQNum += 1));
        setError((oldData) => {
          return {
            ...oldData,
            message: data.message,
            valid: true,
          };
        });
      } else {
        setError((oldData) => {
          return {
            ...oldData,
            message: data.message,
            valid: false,
          };
        });
      }
    } else {
      setError((oldData) => {
        return {
          ...oldData,
          message: "Please enter a valid email",
          valid: false,
        };
      });
    }
  };

  return (
    <div className="w-full text-center h-screen bg-cyan-900 dark:bg-slate-900 text-slate-100">
      <div className="mb-8 pt-8 ">
        <h1 className="font-bold text-xl mb-4">{survey.surveyName}</h1>
        <p className="text-sm mb-2">Please answer the question below</p>
        <p>
          Question {questionNum + 1} of {survey.questions.length}
        </p>
      </div>

      <hr className="mb-8 w-11/12 lg:w-1/2 mx-auto" />
      {/*Question card body */}
      <div className="w-11/12 lg:w-1/2 rounded-xl mx-auto p-5 dark:bg-[#172A46] ">
        <div>
          {/*Question*/}
          <div className="mb-5">
            <h3 className="font-bold text-start">
              {`${questionNum + 1}) ${survey.questions[questionNum].question}`}
            </h3>
          </div>
          {/*Response Options*/}

          {/*For MC question */}
          {survey.questions[questionNum].questionType === "MC" && (
            <div className="ml-5">
              {survey.questions[questionNum].options.map((option, index) => {
                return (
                  <div key={index} className="flex items-center  mb-5">
                    <input
                      type="radio"
                      id={option}
                      value={option}
                      className=" w-4 h-4 mr-3 text-black"
                      name={"type"}
                      onChange={(e) => saveResponse(e)}
                      required
                    />
                    <label htmlFor={option}>{option}</label>
                  </div>
                );
              })}
              {!error.valid && (
                <p className="text-start text-sm text-red-400">
                  {error.message}
                </p>
              )}
            </div>
          )}

          {/*For CustomUserInfo type question */}
          {survey.questions[questionNum].questionType === "CustomUserInfo" && (
            <div className="ml-5 flex flex-col text-start">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                className="mb-5 rounded-lg h-8 px-3 outline-0 text-black"
                onChange={(e) => saveResponse(e)}
                required
              />
              {!error.valid && (
                <p className="text-red-500  text-sm">
                  <i>*{error.message}*</i>
                </p>
              )}
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                className="mb-5 rounded-lg h-8 px-3 outline-0 text-black"
                onChange={(e) => saveResponse(e)}
                required
              />
            </div>
          )}
          {/*For Other type question */}
          {survey.questions[questionNum].questionType === "Other" && (
            <div className="ml-5">
              {survey.questions[questionNum].imgURL.map((img, index) => {
                return (
                  <div key={img}>
                    <img
                      src={survey.questions[questionNum].imgURL[index]}
                      alt={survey.questions[questionNum].imgDesc[index]}
                      className="w-20 mx-auto mb-5 rounded-xl"
                    />
                    <p>
                      <b>Description:</b>{" "}
                      {survey.questions[questionNum].imgDesc[index]}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
          {/*For Short-Answer type question */}
          {survey.questions[questionNum].questionType === "Short Answer" && (
            <div className="ml-5 ">
              {survey.questions[questionNum].imgURL.map((img, index) => {
                return (
                  <div key={img}>
                    <img
                      src={img}
                      alt={survey.questions[questionNum].imgDesc[index]}
                      className="w-20 mx-auto mb-5 rounded-xl"
                    />
                    {survey.questions[questionNum].imgDesc[index] && (
                      <p className="mb-5">
                        <b>Description:</b>{" "}
                        {survey.questions[questionNum].imgDesc[index]}
                      </p>
                    )}
                    {!survey.questions[questionNum].imgDesc[index] && (
                      <input
                        type="text"
                        name={img}
                        placeholder="Enter your answer"
                        className="mb-5 rounded-lg h-8 text-center px-5 text-black"
                        value={
                          response[
                            survey.questions[questionNum].question[index]
                          ]
                        }
                        required
                        onChange={(e) => saveResponse(e)}
                      />
                    )}
                  </div>
                );
              })}
              {!error.valid && (
                <p className="text-red-400 text-sm">
                  <i>*{error.message}*</i>
                </p>
              )}
            </div>
          )}
        </div>

        {/*Next/Prev buttons */}
        <div className="flex justify-around w-1/2 mx-auto">
          {/* <button
            onClick={() => nextQuestion("prev")}
            className="bg-slate-900/50 w-1/7 text-sm px-4 py-2 border rounded-3xl text-white mt-5 "
            disabled
          >
            Previous
          </button> */}
          {questionNum === 0 && (
            <button
              className="bg-cyan-900 w-24 text-sm px-4 py-2 border dark:border-2 dark:border-[#51D1B4] dark:text-[#51D1B4] rounded-3xl text-slate-200 mt-5 active:bg-cyan-900/75 dark:hover:bg-[#0A192F] dark:hover:text-cyan-100 dark:bg-transparent"
              onClick={() => {
                verifyEmail();
              }}
            >
              Verify
            </button>
          )}
          {questionNum < survey.questions.length - 1 && questionNum !== 0 && (
            <button
              onClick={() => nextQuestion()}
              className="bg-cyan-900 w-24 text-sm px-4 py-2 border dark:border-2 dark:border-[#51D1B4] dark:text-[#51D1B4] rounded-3xl text-slate-200 mt-5 active:bg-cyan-900/75 dark:hover:bg-[#0A192F] dark:hover:text-cyan-100 dark:bg-transparent select-none"
            >
              Next
            </button>
          )}
          {questionNum === survey.questions.length - 1 && (
            <button
              type="button"
              className="bg-cyan-900 w-24 text-sm px-4 py-2 border dark:border-2 dark:border-[#51D1B4] dark:text-[#51D1B4] rounded-3xl text-slate-200 mt-5 active:bg-cyan-900/75 dark:hover:bg-[#0A192F] dark:hover:text-cyan-100 dark:bg-transparent select-none"
              onClick={() => {
                submitResponse();
              }}
            >
              Submit
            </button>
          )}
        </div>
        <br />
        <button
          type="button"
          className="dark:text-[#51D1B4] "
          onClick={() => navigateHome()}
        >
          {home}
        </button>
      </div>
    </div>
  );
}

export default QuestionCard;
