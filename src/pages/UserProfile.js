import UserCard from "components/UserCard";
import React from "react";
import useFetch from "utility/useFetch";
import DashNav from "../components/DashNav";
function UserProfile({ theme }) {
  const token = localStorage.getItem("token");
  const baseURL = "https://surveyconnect-server.onrender.com";

  const { data = { _id: "" }, loading } = useFetch(
    `${baseURL}/user/userprofile`,
    token
  );

  return (
    <div className="">
      <div className=" h-screen dark:bg-slate-900">
        <DashNav theme={theme} />
        <UserCard user={data} loading={loading} />
      </div>
    </div>
  );
}

export default UserProfile;
