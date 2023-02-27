import React from "react";

function SurveyOverView({ data }) {
  return (
    <div className="w-full">
      <div className="w-2/3 grid grid-cols-2 gap-5 mx-auto mt-10">
        <div className="w-full bg-slate-300 px-5 border-t-4 border-cyan-900">
          <h3 className="font-bold mt-3">Survey</h3>
          <div className="flex gap-10 mt-3 text-sm">
            <p className="w-1/2 font-bold">Survey Name</p>
            <p className="w-1/2 ">{data.survey.surveyName}</p>
          </div>
          <div className="flex gap-10 mt-3 text-sm">
            <p className="w-1/2 font-bold">Organization</p>
            <p className="w-1/2">{data.survey.organization}</p>
          </div>
          <div className="flex  gap-10 mt-3 text-sm">
            <p className="w-1/2 font-bold">Status</p>
            <p className="w-1/2">
              {data.survey.status ? "Active" : "In-active"}
            </p>
          </div>
          <div className="flex  gap-10 mt-3 mb-10 text-sm">
            <p className="w-1/2 font-bold">Date Created</p>
            <p className="w-1/2">
              {data.survey.dateCreated && data.survey.dateCreated.slice(0, 10)}
            </p>
          </div>
        </div>
        <div className="w-full bg-slate-300 px-5 border-t-4 border-cyan-900">
          <h3 className="font-bold mt-3 ">Responses</h3>
          <div className="flex justify-between mt-3 font-bold text-sm">
            <h5 className="">Respondent</h5>
            <h5>Date</h5>
          </div>
          {data.response.map((response) => {
            return (
              <div className="text-sm" key={response._id}>
                <div className="flex justify-between mt-3">
                  <p>
                    {response.userRef.firstName} {response.userRef.lastName}
                  </p>
                  <p>{response.dateCreated.slice(0, 10)}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-full bg-slate-300 px-5 border-t-4 border-cyan-900">
          <h3 className="font-bold mt-3">Change History</h3>
          <div className="flex justify-center h-52 justify-center items-center">
            <p className="text-sm">No Records</p>
          </div>
        </div>
        <div className="w-full bg-slate-300 px-5 border-t-4 border-cyan-900 pb-">
          <h3 className="font-bold mt-3">Data Summary</h3>
          <div className="text-sm flex justify-between ">
            <p className="mt-4">No. Response</p>
            <p className="mt-4">{data.response.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SurveyOverView;
