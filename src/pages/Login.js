import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./GradientBG.css";
import Spinner from "../assets/loading-gif.gif";

function Login({ theme }) {
  const HomeIcon = <FontAwesomeIcon icon={faHome} />;
  const EyeReveal = <FontAwesomeIcon icon={faEye} />;
  const baseURL_development = "http://localhost:5000";

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  });
  const [loginInfo, setLoginInfo] = useState({
    password: "",
    email: "",
  });

  const [rememberLogin, setRememberLogin] = useState(false);
  const [authErrorMsg, setAuthErrorMsg] = useState("");
  const [revealPass, setRevealPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputOnChange = (e) => {
    setLoginInfo((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const logUserIn = async (userInfo, e) => {
    setLoading(true);
    const response = await fetch(`${baseURL_development}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } else {
      localStorage.removeItem("token");
      setAuthErrorMsg(data.message);
    }
  };
  const resetError = () => {
    setAuthErrorMsg("");
  };
  return (
    <div
      className={
        theme
          ? "w-full h-screen flex items-center justify-center dark-background pb-1"
          : "w-full h-screen flex items-center justify-center background pb-1"
      }
    >
      <div className="w-96 xl:w-1/4 flex flex-col h-5/7 border-transparet rounded-2xl p-10 bg-slate-800/50">
        <form action="" className="flex flex-col w-full">
          <p className="text-end text-sky-100 text-sm">
            Don't have an account yet?{" "}
            <a
              href="/register"
              className="text-sky-500 hover:cursor-pointer m-0 p-0"
            >
              Sign Up Here
            </a>
          </p>

          <h1 className="text-2xl py-3 text-sky-100 ">Log In</h1>
          {authErrorMsg !== "" && (
            <div
              id="toast-danger"
              className="flex items-center w-full p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
              role="alert"
            >
              <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Error icon</span>
              </div>
              <div className="ml-3 text-sm font-normal">{authErrorMsg}</div>
              <button
                type="button"
                className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                data-dismiss-target="#toast-danger"
                aria-label="Close"
                onClick={resetError}
              >
                <span className="sr-only">Close</span>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          )}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-md text-sky-100 mb-2">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={loginInfo.email}
              onChange={(e) => inputOnChange(e)}
              className="border-transparent rounded-xl outline-0 p-2 h-9 mb-3"
              placeholder="example@email.com"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-md text-sky-100 mb-2">
              Password
            </label>
            <div className="flex w-full">
              <input
                type={revealPass ? "text" : "password"}
                name="password"
                id="password"
                value={loginInfo.password}
                className="border-transparent rounded-l-xl outline-0 p-2 h-9 mb-3 w-11/12"
                onChange={(e) => inputOnChange(e)}
                placeholder="password"
              />
              <button
                style={{ backgroundColor: "#E8F0FE", color: "#1A2629" }}
                type="button"
                className="bg-slate-100 rounded-r-xl outline-0 p-2 h-9 mb-3"
                onClick={() => setRevealPass(!revealPass)}
              >
                {EyeReveal}
              </button>
            </div>
          </div>
          <div className="flex gap-1 mb-3">
            <input
              type="checkbox"
              id="termsOfUse"
              checked={rememberLogin}
              onChange={() => setRememberLogin(!rememberLogin)}
              className="w-7"
            />
            <p className="text-sm text-sky-100">Remember Me</p>
          </div>
          <div
            className="w-full w-full bg-zinc-900/75 h-10 text-sky-100 flex justify-center items-center hover:cursor-pointer"
            onClick={(e) => logUserIn(loginInfo, e)}
          >
            {!loading ? (
              <span>Log In</span>
            ) : (
              <img src={Spinner} alt="Spinner" className="h-1/2"></img>
            )}
          </div>
        </form>
        <a href="/" className="text-white text-center mt-5">
          {HomeIcon}
        </a>
      </div>
    </div>
  );
}

export default Login;
