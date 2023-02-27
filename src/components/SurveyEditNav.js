import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
function SurveyEditNav({ tab, changeTab }) {
  const arrowRight = <FontAwesomeIcon icon={faArrowRightLong} size={"xs"} />;

  return (
    <div className="bg-slate-100 w-full shadow-xl h-12 ">
      <div className="flex justify-start w-2/3 mx-auto items-center h-full">
        <div
          className={
            tab === "Over View"
              ? "mr-3 w-24 border-b-4 border-cyan-900 h-full flex items-center justify-center text-cyan-900 font-bold"
              : "mr-3 w-24 border-b-4 border-transparent h-full flex items-center justify-center "
          }
        >
          <button value={"Over View"} onClick={(e) => changeTab(e)}>
            Over View
          </button>
        </div>

        <div className="mr-3 text-gray-400">{arrowRight}</div>
        <div
          className={
            tab === "Survey Info"
              ? "mr-3 w-24 border-b-4 border-cyan-900 h-full flex items-center justify-center text-cyan-900 font-bold"
              : "mr-3 w-24 border-b-4 border-transparent h-full flex items-center justify-center "
          }
        >
          <button value={"Survey Info"} onClick={(e) => changeTab(e)}>
            Survey Info
          </button>
        </div>

        <div className="mr-3 text-gray-400">{arrowRight}</div>
        <div
          className={
            tab === "Questions"
              ? "mr-3 w-24 border-b-4 border-cyan-900 h-full flex items-center justify-center text-cyan-900 font-bold"
              : "mr-3 w-24 border-b-4 border-transparent h-full flex items-center justify-center "
          }
        >
          <button value={"Questions"} onClick={(e) => changeTab(e)}>
            Questions
          </button>
        </div>
        <div className="mr-3 text-gray-400">{arrowRight}</div>
        <div
          className={
            tab === "Data"
              ? "mr-3 w-20 border-b-4 border-cyan-900 h-full flex items-center justify-center text-cyan-900 font-bold"
              : "mr-3 w-20 border-b-4 border-transparent h-full flex items-center justify-center "
          }
        >
          <button value={"Data"} onClick={(e) => changeTab(e)}>
            Data
          </button>
        </div>
      </div>
    </div>
  );
}

export default SurveyEditNav;
