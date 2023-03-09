import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import SurveySettings from "./SurveySettings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faLock,
  faShareAlt,
  faTrashAlt,
  faLockOpen,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

function SurveyItem({
  survey,
  deleteSurvey,
  subMenu,
  setSubMenu,
  selectLockSurvey,
}) {
  const del = <FontAwesomeIcon icon={faTrashAlt} size={"sm"} />;
  const edit = <FontAwesomeIcon icon={faEdit} size={"sm"} />;
  const share = <FontAwesomeIcon icon={faShareAlt} size={"sm"} />;
  const lock = <FontAwesomeIcon icon={faLock} size={"sm"} />;
  const unlock = <FontAwesomeIcon icon={faLockOpen} size={"sm"} />;
  const copy = <FontAwesomeIcon icon={faCheck} size={"sm"} />;
  const [copied, setCopied] = useState(false);

  return (
    <div className="mb-2">
      <div className="flex justify-around pt-5 bg-white w-11/12 xl:w-8/12 mx-auto h-24 text-sm  text-gray-500 rounded-lg shadow-2xl dark:bg-[#172A46] dark:text-slate-100">
        <div className="md:flex md:justify-around  full md:w-56">
          <h6 className="text-center text-xs lg:text-sm font-semibold  md:hidden w-28 ">
            <div className="w-full truncate"> {survey.surveyName}</div>
            {!survey.public && (
              <div className=" w-full block md:hidden  mx-auto text-center align-top ">
                {lock}
              </div>
            )}
          </h6>
          <h6 className="text-center text-xs lg:text-sm font-semibold  hidden md:block md:w-20 lg:w-36 ">
            <div> {survey.surveyName}</div>
            {!survey.public && (
              <div className=" w-full hidden sm:block  mx-auto text-center align-top ">
                {lock}
              </div>
            )}
          </h6>
          <h6 className="text-center text-xs  md:text-sm truncate md:hidden w-24 ">
            {survey.organization}
          </h6>
          <div className="text-center text-xs  lg:text-sm  hidden md:block w-20 ">
            <h6 className="font-semibold">Owner</h6>
            <p className="text-xs truncate">{survey.organization}</p>
          </div>
        </div>
        <div className="hidden md:flex flex-col w-20 sm:28 md:w-24 text-center">
          <h6 className="text-xs lg:text-sm font-semibold">Responses</h6>
          <p className="text-xs">{survey.numResponse}</p>
        </div>
        <div className="w-16 ">
          <h6 className="text-xs lg:text-sm font-semibold">Created</h6>
          <p className="text-xs">{survey.dateCreated.slice(0, 10)}</p>
        </div>
        <div className="w-16">
          <h6 className="text-xs lg:text-sm font-semibold">End</h6>
          <p className="text-xs">{survey.dateEnd.slice(0, 10)}</p>
        </div>

        <div className="flex ">
          <Link
            className="border dark:border-2 h-8 md:h-10 py-1 sm:py-2 px-5 rounded-3xl text-white bg-green-600 hover:bg-green-500  dark:border-[#51D1B4]  dark:text-[#51D1B4] w-28 flex justify-center items-center md:w-24 lg:w-28 hover:cursor-pointer  dark:hover:bg-[#0A192F] dark:hover:text-cyan-100
            dark:bg-transparent"
            to={`/survey/${survey._id}`}
            state={{ id: survey._id }}
          >
            <p className="w-full text-xs text-center">View </p>
          </Link>
          <Link
            to={`/surveyedit/${survey._id}`}
            className="border dark:border-slate-600 h-10 p-3 rounded-2xl ml-4  mr-1 hover:bg-slate-300 dark:hover:bg-[#51D1B4] hover:cursor-pointer hidden sm:block"
          >
            {edit}
          </Link>

          <div
            className="border dark:border-slate-600 h-10 p-3 rounded-2xl mx-1 hover:bg-slate-300  dark:hover:bg-[#51D1B4] hover:cursor-pointer hidden sm:block"
            onClick={() => {
              selectLockSurvey(survey._id);
            }}
          >
            {survey.public ? <span>{lock}</span> : <span>{unlock}</span>}
          </div>
          <div className="border dark:border-slate-600 h-10 p-3 rounded-2xl  mx-1 hover:bg-slate-300  dark:hover:bg-[#51D1B4] hover:cursor-pointer hidden sm:block">
            <CopyToClipboard
              text={`https://surveyconnect.onrender.com/survey/${survey._id}`}
              onCopy={() => setCopied(true)}
            >
              {copied ? copy : share}
            </CopyToClipboard>
          </div>
        </div>
        <div className="flex w-2 lg:hidden h-full align-top hover:cursor-pointer sm:hidden">
          <SurveySettings
            survey={survey}
            deleteSurvey={deleteSurvey}
            subMenu={subMenu}
            setSubMenu={setSubMenu}
            selectLockSurvey={selectLockSurvey}
          ></SurveySettings>
        </div>
        <div
          className="border dark:border-slate-600 h-10 p-3 rounded-2xl hover:bg-red-300 hover:cursor-pointer hover:border-red-200 hidden sm:block md:mr-2"
          id={survey._id}
          onClick={(e) => {
            deleteSurvey(e);
          }}
        >
          {del}
        </div>
      </div>
    </div>
  );
}

export default SurveyItem;
