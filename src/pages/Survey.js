import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import QuestionCard from "components/QuestionCard";
import useFetch from "../utility/useFetch";
import LoadingSpinner from "../assets/loading-gif.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const home = <FontAwesomeIcon icon={faHome} />;

const token = localStorage.getItem("token");

function Survey({ theme }) {
  const navigate = useNavigate();
  const baseURL = "https://surveyconnect-server.onrender.com";
  const location = useLocation();
  const id = location.state ?? window.location.href.split("/").pop();
  console.log(id);
  const {
    data = { errorMessage: "", _id: "", surveyName: "" },
    loading = true,
    error = false,
  } = useFetch(`${baseURL}/survey/${id}`, token);
  console.log(data, loading, error);
  if (loading) {
    return (
      <div className="w-full flex justify-center items-center h-screen bg-cyan-900 dark:bg-slate-900">
        <img src={LoadingSpinner} alt="loading" className="w-8" />
      </div>
    );
  } else if (data.errorMessage === "verifyAccess") {
    navigate("/verify", {
      state: { id: `${id}`, surveyName: data.surveyName },
    });
  } else if (error) {
    return (
      <div className="w-full flex flex-col justify-center items-center h-screen bg-cyan-900 text-sky-100 dark:bg-slate-900">
        <h1 className="text-3xl">404</h1>
        <h3 className="mb-5">Unable to retrieve data</h3>
        <Link to="/" className="text-sky-100">
          {home}
        </Link>
      </div>
    );
  } else if (data._id) {
    return (
      <div>
        <QuestionCard survey={data} ownerView={false} />
      </div>
    );
  }
}

export default Survey;
