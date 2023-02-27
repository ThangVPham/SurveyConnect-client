import React from "react";
import "./DashNav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faUserCircle,
  faPlus,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../assets/SC.svg";
import LogoWhite from "../assets/SCWhite.svg";

function DashNav({ theme }) {
  const bell = (
    <FontAwesomeIcon
      icon={faBell}
      size={"xl"}
      style={{ color: theme ? "white" : "gray" }}
    />
  );
  const user = (
    <FontAwesomeIcon
      icon={faUserCircle}
      size={"2xl"}
      style={{ color: theme ? "white" : "gray" }}
    />
  );
  const add = <FontAwesomeIcon icon={faPlus} size={"xs"} />;
  const menu = (
    <FontAwesomeIcon icon={faBars} size={"2xl"} style={{ color: "gray" }} />
  );

  return (
    <div className={theme ? "dark" : ""}>
      <div className="bg-gradient-to-r bg-white   text-white h-16 shadow-xl dark:bg-gradient-to-r dark:from-[#09192F] dark:to-[#172A46] dark:text-sky-50">
        <header className="flex justify-between mx-4 h-full items-center  w-100">
          <div className="w-44 xl:w-6/12 hidden sm:block">
            <a href="/">
              <img src={theme ? LogoWhite : Logo} alt="" className="w-100 " />
            </a>
          </div>
          <div className="sm:hidden hover:cursor-pointer">{menu}</div>

          <div className="flex dash-ul-font items-center w-56 justify-end">
            <button
              className={
                "px-2 py-2 w-36   mr-3 text-center border rounded-3xl  dark:border-2 dark:border-[#51D1B4] bg-green-700 hover:bg-green-600 dark:bg-transparent dark:text-[#51D1B4] hover:cursor-pointer  dark:hover:bg-[#0A192F] dark:hover:text-cyan-100"
              }
            >
              <div className="flex justify-center focus:ring focus:white">
                <div className="mr-1">{add}</div>
                <a href="/newsurvey">New Survey</a>
              </div>
            </button>
            <div className="flex justify-content-evenly ">
              <button className="pt-1 hover:text-green-200 dark:hover:text-sky-600">
                {bell}
              </button>
              <a
                href="/user"
                className="px-3 flex pt-1 align-top hover:text-green-200 dark:hover:text-sky-600"
              >
                {user}
              </a>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}

export default DashNav;
