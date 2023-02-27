import React from "react";
import ASLQuestionCard from "components/ASLQuestionCard";
import useFetch from "../utility/useFetch";
import LoadingSpinner from "../assets/loading-gif.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
const home = <FontAwesomeIcon icon={faHome} />;
const id = window.location.href.split("/").pop();
const token = localStorage.getItem("token");

function ASLSurvey({ theme }) {
  const location = useLocation();
  const data = location.state.survey;

  return (
    <div>
      <ASLQuestionCard survey={data} />
    </div>
  );
}

export default ASLSurvey;
