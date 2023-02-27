import React from "react";
import DashNav from "../components/DashNav";
import DashSurveyList from "../components/DashSurveyList";

function Dashboard({ theme }) {
  return (
    <div>
      <DashNav theme={theme} />
      <DashSurveyList theme={theme} />
    </div>
  );
}

export default Dashboard;
