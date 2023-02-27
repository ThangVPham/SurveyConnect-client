import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import "./SurveySettings.css";
const SurveySettings = ({
  survey,
  deleteSurvey,
  subMenu,
  setSubMenu,
  selectLockSurvey,
}) => {
  const dots = <FontAwesomeIcon icon={faEllipsisV} size={"lg"} />;

  const [linkCopied, setLinkCopied] = useState("Copy Link");
  const [collapse, setCollapse] = useState(subMenu);
  //if user click anywhere on page, close all survey settings buttons
  useEffect(() => {
    if (subMenu) {
      setCollapse(subMenu);
    }
  }, [subMenu]);
  const collapseMenu = (e) => {
    if (e.target.id === "copy") {
      return;
    }

    setCollapse((oldState) => {
      setSubMenu(!subMenu);
      return !oldState;
    });
  };
  const confirmLinkCopy = () => {
    setLinkCopied("Copied");
  };

  return (
    <div
      className="flex relative cursor-pointer pr-3"
      onClick={(e) => collapseMenu(e)}
    >
      {dots}
      {collapse ? (
        <div className="w-1/2 h-1/2"></div>
      ) : (
        <div
          className="absolute right-5 rounded-lg pt-3 w-24 h-36 text-white bg-green-800/[0.85] 
        dark:bg-slate-900 dark:border-slate-400 dark:border-2 dark:text-white"
        >
          <div className="flex flex-col text-sm ">
            <CopyToClipboard
              text={`http://localhost:3000/survey/${survey._id}`}
              //change text to website url once lauched
            >
              <span
                className="pl-3 hover:text-green-400  dark:hover:text-[#51D1B4] "
                id="copy"
                onClick={() => {
                  confirmLinkCopy();
                }}
              >
                {linkCopied}
              </span>
            </CopyToClipboard>

            <a
              className="pt-3 pl-3 hover:text-green-400  dark:hover:text-[#51D1B4]"
              href={`/surveyedit/${survey._id}`}
            >
              Edit
            </a>
            <span
              className="pt-3 pl-3 hover:text-green-400  dark:hover:text-[#51D1B4]"
              id={survey._id}
              onClick={() => selectLockSurvey(survey._id)}
            >
              {survey.public ? "Lock" : "Unlock"}
            </span>
            <span
              className="pt-3 pl-3 hover:text-green-400  dark:hover:text-[#51D1B4]"
              id={survey._id}
              onClick={(e) => {
                deleteSurvey(e);
              }}
            >
              Delete
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveySettings;
