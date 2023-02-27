import React, { useState, useEffect } from "react";
import "./GradientBG.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Spinner from "../assets/loading-gif.gif";
const emailFormatRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function Register({ theme }) {
  const HomeIcon = <FontAwesomeIcon icon={faHome} />;
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  });
  const [userInfo, setUserInfo] = useState({
    password: "",
    email: "",
  });
  const [termsOfUse, setTermsOfUse] = useState(false);
  const [promotionEmailAgree, setPromotionEmailAgree] = useState(false);
  const [emailFormat, setEmailFormat] = useState(true);
  const [loading, setLoading] = useState(false);
  const inputOnChange = (e) => {
    setUserInfo((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const [card, setCard] = useState(0);

  const registerUser = async (user, e) => {
    e.preventDefault();
    setLoading(true);
    if (emailFormatRegex.test(user.email)) {
      const response = await fetch(
        "https://surveyconnect-server.onrender.com/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      const data = await response.json();
      if (data.token) {
        console.log("in");
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        console.log(data);
      }
    } else {
      setEmailFormat(false);
      setCard(0);
    }
  };

  const setPage = () => {
    if (card !== 1 && userInfo.email !== "") {
      setCard(1);
    } else {
      setCard(0);
    }
  };
  return (
    <div
      className={
        theme
          ? "w-full h-screen flex items-center justify-center dark-background pb-1"
          : "w-full h-screen flex items-center justify-center background pb-1"
      }
    >
      <div className="w-96 xl:w-1/4 h-5/7  border-transparent rounded-2xl p-10 bg-slate-800/50">
        <form action="" className="flex flex-col w-full">
          {card === 1 && (
            <button
              className="self-start text-sky-100"
              type="button"
              onClick={() => setPage()}
            >
              <u>Back</u>
            </button>
          )}

          <p className="text-end text-sky-100 text-sm">
            Already have an account?{" "}
            <a className="text-sky-500 hover:cursor-pointer m-0" href="/login">
              Login Here
            </a>
          </p>

          <h1 className="text-2xl py-3 text-sky-100 ">Create an account</h1>
          {!emailFormat && (
            <div
              id="toast-warning"
              className="flex items-center w-full p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 mb-3"
              role="alert"
            >
              <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Warning icon</span>
              </div>
              <div className="ml-3 text-sm font-normal">
                Please enter a valid email address.
              </div>
              <button
                type="button"
                className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                data-dismiss-target="#toast-warning"
                aria-label="Close"
                onClick={() => setEmailFormat(!emailFormat)}
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
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          )}
          {card === 0 && (
            <div className="flex flex-col">
              <label htmlFor="email" className="text-md text-sky-100 mb-2">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={userInfo.email}
                onChange={(e) => inputOnChange(e)}
                className="border-transparent rounded-xl outline-0 p-2 h-9 mb-3"
                placeholder="example@email.com"
                required
              />
              <div className="flex gap-3 mb-3">
                <input
                  type="checkbox"
                  id="termsOfUse"
                  checked={termsOfUse}
                  onChange={() => setTermsOfUse(!termsOfUse)}
                  className="w-5"
                />
                <p className="text-sm text-sky-100">
                  You agree to the Terms of Use and Privacy Notice.
                </p>
              </div>
              <div className="flex gap-3 mb-10">
                <input
                  type="checkbox"
                  id="termsOfUse"
                  checked={promotionEmailAgree}
                  onChange={() => setPromotionEmailAgree(!promotionEmailAgree)}
                  className="w-12"
                />
                <p className="text-sm text-sky-100">
                  You agree to receive product news and special promotions via
                  email. You can opt-out of these emails in your My Account page
                  anytime.
                </p>
              </div>
            </div>
          )}
          {card === 1 && (
            <div className="flex flex-col">
              <label htmlFor="password" className="text-md text-sky-100 mb-2">
                Enter a password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="border-transparent rounded-xl outline-0 p-2 h-9 mb-3"
                value={userInfo.password}
                onChange={(e) => inputOnChange(e)}
              />
              <label
                htmlFor="confirmPass"
                className="text-md text-sky-100 mb-2"
              >
                Confirm password
              </label>
              <input
                type="password"
                name="confirmPass"
                id="confirmPass"
                className="border-transparent rounded-xl outline-0 p-2 h-9 mb-16"
              />
            </div>
          )}
          {card === 0 && (
            <button
              type="button"
              className={
                termsOfUse && userInfo.email !== ""
                  ? "w-full bg-zinc-900/75 h-10 text-sky-100"
                  : "w-full bg-zinc-900/25 h-10 text-sky-100/25 hover:cursor-default"
              }
              onClick={() => setPage()}
              disabled={!termsOfUse}
            >
              Next
            </button>
          )}
          {card === 1 && (
            <div
              className="w-full w-full bg-zinc-900/75 h-10 text-sky-100 hover:cursor-pointer flex justify-center items-center"
              onClick={(e) => registerUser(userInfo, e)}
            >
              {!loading ? (
                <span>Create Account</span>
              ) : (
                <img src={Spinner} alt="Spinner" className="h-1/2"></img>
              )}
            </div>
          )}
          <a href="/" className="text-white text-center mt-5">
            {HomeIcon}
          </a>
        </form>
      </div>
    </div>
  );
}

export default Register;
