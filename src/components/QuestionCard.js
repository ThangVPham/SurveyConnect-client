import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function QuestionCard({ survey, ownerView }) {
  const baseURL_development = "http://localhost:5000";
  const home = <FontAwesomeIcon icon={faHome} />;
  const surveyID = window.location.href.split("/").pop();
  const token = localStorage.getItem("token");
  const [questionNum, setQuestionNum] = useState(0);
  const questions = survey.questions.map((q) => {
    return q.question;
  });
  const initialResponse = {};
  for (const question of questions) {
    initialResponse[question] = "";
  }

  //Survey response
  const [response, setReseponse] = useState(initialResponse);

  const navigate = useNavigate();
  const nextQuestion = (action) => {
    if (action === "next") {
      if (questionNum < survey.questions.length - 1)
        setQuestionNum((oldQIndex) => (oldQIndex += 1));
    } else if (action === "prev") {
      if (questionNum > 0) setQuestionNum((oldQIndex) => (oldQIndex -= 1));
    }
  };

  const saveResponse = (e) => {
    const currentQuestion = survey.questions[questionNum].question;

    if (e.target.type === "checkbox") {
      if (response[currentQuestion] !== "") {
        if (!response[currentQuestion].includes(e.target.value)) {
          response[currentQuestion].push(e.target.value);
        } else {
          const index = response[currentQuestion].indexOf(e.target.value);
          response[currentQuestion].splice(index, 1);
        }
      } else {
        response[currentQuestion] = [e.target.value];
      }

      setReseponse({
        ...response,
        [currentQuestion]: response[currentQuestion],
      });
    } else if (
      survey.questions[questionNum].questionType === "CustomUserInfo"
    ) {
      setReseponse({
        ...response,
        [currentQuestion]: {
          ...response[currentQuestion],
          [e.target.name]: e.target.value,
        },
      });
    } else {
      setReseponse({
        ...response,
        [currentQuestion]: e.target.value,
      });
    }
  };

  const submitResponse = async () => {
    const requestHeaders = {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
      surveyID: surveyID,
    };
    const res = await fetch(`${baseURL_development}/response/submitresponse`, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(response),
    });
    const data = await res.json();
    if (data.status === "Success") {
      navigate("/success");
    }
  };
  const navigateHome = () => {
    if (survey.activeStatus) {
      const res = window.confirm(
        "Are you sure you want to return? All your progress will be lost."
      );
      if (res) {
        navigate("/dashboard");
      }
    } else {
      navigate("/dashboard");
    }
  };
  return (
    <div className="w-full text-center h-screen bg-cyan-900">
      <div className="mb-8 pt-8 text-sky-100">
        <h1 className="font-bold text-xl mb-4">{survey.surveyName}</h1>
        {survey.activeStatus ? (
          <p className="text-sm mb-2">Please answer the question below</p>
        ) : (
          <p className="text-sm mb-2">
            The survey has ended. Take you for your participation.
          </p>
        )}

        <p>
          Question {questionNum + 1} of {survey.questions.length}
        </p>
      </div>

      <hr className="mb-8 w-11/12 lg:w-1/2 mx-auto" />
      {/*Question card body */}
      <div className="w-11/12 lg:w-1/2 rounded-xl mx-auto p-5 bg-sky-100">
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
              {survey.questions[questionNum].options.map((option) => {
                let id = Math.random();
                if (
                  option === response[survey.questions[questionNum].question]
                ) {
                  return (
                    <div key={id} className="flex items-center  mb-5">
                      <input
                        checked
                        type="radio"
                        id={option}
                        value={option}
                        className=" w-4 h-4 mr-3"
                        name={`value-${questionNum}`}
                        onChange={(e) => saveResponse(e)}
                        disabled={!survey.activeStatus}
                      />
                      <label htmlFor={option}>{option}</label>
                    </div>
                  );
                } else {
                  return (
                    <div key={id} className="flex items-center  mb-5">
                      <input
                        type="radio"
                        id={option}
                        value={option}
                        className=" w-4 h-4 mr-3"
                        name={`value-${questionNum}`}
                        onChange={(e) => saveResponse(e)}
                        disabled={!survey.activeStatus}
                      />
                      <label htmlFor={option}>{option}</label>
                    </div>
                  );
                }
              })}
            </div>
          )}
          {/*For Checkbox type question */}
          {survey.questions[questionNum].questionType === "Checkbox" && (
            <div className="ml-5">
              {survey.questions[questionNum].options.map((option) => {
                let id = Math.random();
                if (
                  response[survey.questions[questionNum].question].includes(
                    option
                  )
                ) {
                  return (
                    <div key={id} className="flex items-center  mb-5">
                      <input
                        checked
                        type="checkbox"
                        id={option}
                        value={option}
                        className=" w-4 h-4 mr-3"
                        name="value"
                        onChange={(e) => saveResponse(e)}
                        disabled={!survey.activeStatus}
                      />
                      <label htmlFor={option}>{option}</label>
                    </div>
                  );
                } else {
                  return (
                    <div key={id} className="flex items-center  mb-5">
                      <input
                        type="checkbox"
                        id={option}
                        value={option}
                        className=" w-4 h-4 mr-3"
                        name="value"
                        onChange={(e) => saveResponse(e)}
                        disabled={!survey.activeStatus}
                      />
                      <label htmlFor={option}>{option}</label>
                    </div>
                  );
                }
              })}
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
                className="mb-5 rounded-lg h-8 px-3 outline-0"
                onChange={(e) => saveResponse(e)}
                disabled={!survey.activeStatus}
              />
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                className="mb-5 rounded-lg h-8 px-3 outline-0"
                onChange={(e) => saveResponse(e)}
                disabled={!survey.activeStatus}
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
              <div>
                {!survey.questions[questionNum].imgURL.length && (
                  <div>
                    <input
                      type="text"
                      placeholder="Enter your answer"
                      className="mb-5 rounded-lg h-8 text-center px-5"
                      disabled={!survey.activeStatus}
                    />
                  </div>
                )}
              </div>
              {survey.questions[questionNum].imgURL.map((img, index) => {
                if (img !== undefined) {
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
                          id={img}
                          placeholder="Enter your answer"
                          className="mb-5 rounded-lg h-8 text-center px-5"
                          value={
                            response[
                              survey.questions[questionNum].question[index]
                            ]
                          }
                          onChange={(e) => saveResponse(e)}
                          disabled={!survey.activeStatus}
                        />
                      )}
                    </div>
                  );
                } else if (img === undefined) {
                  console.log(img);
                  return (
                    <div>
                      <input
                        type="text"
                        placeholder="Enter your answer"
                        className="mb-5 rounded-lg h-8 text-center px-5"
                        value={response[survey.questions[questionNum].question]}
                        onChange={(e) => saveResponse(e)}
                        disabled={!survey.activeStatus}
                      />
                    </div>
                  );
                }
              })}
            </div>
          )}
          {/*For Long-Feedback type question */}
          {survey.questions[questionNum].questionType === "Long Feedback" && (
            <div>
              <div className="w-full">
                {!survey.questions[questionNum].imgURL.length && (
                  <div className="w-full">
                    <textarea
                      placeholder="Please enter your response here."
                      className="mb-5 w-full rounded-lg px-5 py-3 outline-0"
                      value={response[survey.questions[questionNum].question]}
                      onChange={(e) => saveResponse(e)}
                      disabled={!survey.activeStatus}
                    />
                  </div>
                )}
              </div>
              {survey.questions[questionNum].imgURL.map((img, index) => {
                let id = Math.random();
                if (img !== undefined) {
                  return (
                    <div key={id} className="w-full">
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
                        <textarea
                          placeholder="Please enter your response here."
                          className="mb-5 rounded-lg outline-0 text-center px-5"
                          value={
                            response[survey.questions[questionNum].question]
                          }
                          onChange={(e) => saveResponse(e)}
                          disabled={!survey.activeStatus}
                        />
                      )}
                    </div>
                  );
                } else if (img === undefined) {
                  console.log(img);
                  return (
                    <div>
                      <textarea
                        placeholder="Enter your answer"
                        className="mb-5 rounded-lg text-center px-5"
                        value={response[survey.questions[questionNum].question]}
                        onChange={(e) => saveResponse(e)}
                        disabled={!survey.activeStatus}
                      />
                    </div>
                  );
                }
              })}
            </div>
          )}
        </div>

        {/*Next/Prev buttons */}
        <div className="flex justify-around w-1/2 mx-auto">
          <button
            onClick={() => nextQuestion("prev")}
            className="bg-cyan-900 w-1/7 text-sm px-4 py-2 border rounded-3xl text-white mt-5 active:bg-cyan-900/75"
          >
            Previous
          </button>
          {questionNum < survey.questions.length - 1 ? (
            <button
              onClick={() => nextQuestion("next")}
              className="bg-cyan-900 w-24 text-sm px-4 py-2 border rounded-3xl text-white mt-5 active:bg-cyan-900/75"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              className={
                ownerView
                  ? "bg-slate-400 w-24 text-sm px-4 py-2 border rounded-3xl text-white mt-5"
                  : "bg-cyan-900 w-24 text-sm px-4 py-2 border rounded-3xl text-white mt-5 active:bg-cyan-900/75"
              }
              onClick={() => submitResponse()}
              disabled={ownerView}
            >
              Submit
            </button>
          )}
        </div>
        <br />
        <button
          type="button"
          className="text-cyan-900"
          onClick={() => navigateHome()}
        >
          {home}
        </button>
      </div>
    </div>
  );
}

export default QuestionCard;
