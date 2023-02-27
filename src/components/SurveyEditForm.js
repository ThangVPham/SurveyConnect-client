import React, { useState } from "react";

function SurveyEditForm({ data }) {
  const [formBody, setFormBody] = useState(data);

  const updateForm = (e) => {
    if (e.target.name === "public") {
      setFormBody((oldData) => {
        return {
          ...oldData,
          [e.target.name]: Boolean(Number(e.target.value)),
        };
      });
    } else {
      setFormBody((oldData) => {
        return {
          ...oldData,
          [e.target.name]: e.target.value,
        };
      });
    }
  };

  return (
    <div className="w-2/3 mx-auto bg-slate-300 mt-10 p-5 border-t-4 border-cyan-900">
      <form className="flex  flex-col gap-2 text-sm ">
        <label htmlFor="surveyName" className="font-bold ">
          Survey Name
        </label>
        <input
          className="h-8 rounded-lg px-3 outline-none mb-5"
          type="text"
          name="surveyName"
          id="surveyName"
          value={formBody.survey.surveyName}
          onChange={(e) => {
            updateForm(e);
          }}
        />

        <label htmlFor="organization" className="font-bold">
          Organization
        </label>
        <input
          className="h-8 rounded-lg px-3 outline-none  mb-5"
          type="text"
          value={formBody.survey.organization}
          name="organization"
          id="organization"
          onChange={(e) => {
            updateForm(e);
          }}
        />
        <div className="w-full flex justify-between">
          <div className="flex flex-col w-1/2 pr-4 gap-2">
            <label htmlFor="surveyType" className="font-bold ">
              Type
            </label>
            <input
              className="h-8 rounded-lg px-3 outline-none  mb-5"
              type="text"
              name="surveyType"
              value={formBody.survey.surveyType}
              id="surveyType"
              onChange={(e) => {
                updateForm(e);
              }}
            />
          </div>
          <div className="flex flex-col w-1/2 pl-4 gap-2">
            <label htmlFor="dateEnd" className="font-bold ">
              End Date
            </label>
            <input
              className="h-8 rounded-lg px-3 outline-none"
              type="date"
              value={formBody.survey.dateEnd.toString().slice(0, 10)}
              name="dateEnd"
              id="dateEnd"
              onChange={(e) => {
                updateForm(e);
              }}
            />
          </div>
        </div>

        <div className="w-full flex justify-between">
          <div className="flex flex-col w-1/2 pr-4 gap-2">
            <label className="text-sm font-bold " htmlFor="public">
              Access
            </label>
            <select
              name="public"
              id="public"
              className="h-8 rounded-lg px-3 outline-none  mb-5"
              onChange={(e) => {
                updateForm(e);
              }}
            >
              <option value={Number(formBody.survey.public)}>
                {formBody.survey.public ? "--Public--" : "--Private--"}
              </option>
              <option value={1}>Public</option>
              <option value={0}>Private</option>
            </select>
          </div>
          {!formBody.survey.public && (
            <div className="flex flex-col w-1/2 pl-4 gap-2">
              <label htmlFor="surveyType " className="font-bold ">
                Access Code
              </label>
              <input
                className="h-8 rounded-lg px-3 outline-none  mb-5"
                type="text"
                name="surveyType"
                placeholder=""
                id="surveyType"
                onChange={(e) => {
                  updateForm(e);
                }}
              />
            </div>
          )}
        </div>
        <label htmlFor="description" className="font-bold ">
          Description
        </label>
        <textarea
          className="rounded-lg p-3 resize-none outline-none mb-5 h-32"
          name="description"
          id="description"
          value={formBody.survey.description}
          onChange={(e) => {
            updateForm(e);
          }}
        ></textarea>

        <button
          type="button"
          className=" bg-cyan-900 w-1/3 h-8 mx-auto text-white rounded-xl"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default SurveyEditForm;
