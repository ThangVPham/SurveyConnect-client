import React from "react";
import boyWithBook from "../assets/boy-with-book.svg";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";

function Welcome({ theme }) {
  const navigate = useNavigate();
  const checkLogin = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };
  return (
    <div>
      <div>
        <div className="flex flex-col md:flex-row justify-center pt-32">
          <div className="sc__main-container-info-text">
            <h3 className="text-green-600 dark:text-[#51D1B4]">
              Build, Create, Connect
            </h3>
            <h1 className="dark:text-white">
              Ask the questions <br /> that matter
            </h1>
            <p className="dark:text-slate-400">
              Connect with your customers. Get the answers you need with Survey
              Connect!
            </p>
            <div className="flex">
              <button
                className="bg-green-600 w-1/7 px-4 py-2 border rounded-3xl text-sky-50 mt-5 mx-2 hover:cursor-pointer  hover:shadow-xl  dark:bg-transparent dark:hover:text-slate-700 dark:border-[#51D1B4] hover:text-green-600 hover:bg-white dark:hover:bg-[#51D1B4] "
                onClick={checkLogin}
              >
                Get Started
              </button>

              <button
                className="bg-green-600 w-1/7 px-4 py-2 border rounded-3xl text-sky-50 mt-5 mx-2 hover:cursor-pointer  hover:shadow-xl  dark:bg-transparent dark:hover:text-slate-700 dark:border-[#51D1B4]  hover:text-green-600 dark:hover:bg-[#51D1B4] "
                onClick={checkLogin}
              >
                Take Survey
              </button>
            </div>
          </div>
          <div className="w-1/2 sm:w-3/4 md:w-1/2 lg:w-1/4 mt-10 ml-40 sm:ml-28 md:m-0  flex justify-center items-center">
            <img
              src={boyWithBook}
              alt="boy-with-book"
              className="sm:w-1/2 md:w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
