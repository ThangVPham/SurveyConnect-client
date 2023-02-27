import React, { useState, useEffect } from "react";
import DashNav from "../components/DashNav";
import SurveyEditForm from "../components/SurveyEditForm";
import SurveyEditNav from "components/SurveyEditNav";
import SurveyOverView from "components/SurveyOverView";
function SurveyEdit({ theme }) {
  const id = window.location.href.split("/").pop();
  const baseURL_development = "http://localhost:5000";
  const [data, setData] = useState({});

  useEffect(() => {
    console.log("hi");
    const token = localStorage.getItem("token");
    const requestHeaders = {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    };
    fetch(`${baseURL_development}/survey/surveydetail/${id}`, {
      method: "GET",
      headers: requestHeaders,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);

  const changeTab = (e) => {
    setTab(e.target.value);
  };
  const [tab, setTab] = useState("Over View");
  return (
    <div className="bg-white h-screen">
      <DashNav theme={theme}></DashNav>
      <SurveyEditNav tab={tab} changeTab={changeTab} />
      {/* Over View Tab */}
      {Object.keys(data).length !== 0 && tab === "Over View" && (
        <SurveyOverView data={data} />
      )}
      {Object.keys(data).length !== 0 && tab === "Survey Info" && (
        <SurveyEditForm data={data}></SurveyEditForm>
      )}
    </div>
  );
}

export default SurveyEdit;
