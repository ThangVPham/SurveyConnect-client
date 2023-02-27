import React from "react";
import Logo from "../assets/SC.svg";
import LogoWhite from "../assets/SCWhite.svg";
import MobileNavMenu from "./MobileNavMenu";
import Switch from "./Switch";

function Nav({
  theme,
  toggleTheme,
  tab,
  navigateTab,
  active,
  handleChangeActive,
  toggle,
  setToggle,
}) {
  const token = localStorage.getItem("token");

  return (
    <div className={theme ? "dark" : ""}>
      <div className="h-26 flex justify-between items-center px-10 py-2  shadow-2xl dark:bg-[#142641]">
        <a href="/" className="md:w-60 w-1/2 z-100">
          <img
            src={theme ? LogoWhite : Logo}
            alt="SurveyConnect"
            className="w-full "
          />
        </a>
        <div className="w-full hidden md:flex md:justify-center lg:justify-end items-center">
          <div className="flex md:w-1/2 xl:w-1/5 justify-evenly">
            <button
              className=" hover:text-green-600 dark:text-white dark:hover:text-[#51D1B4]"
              value={"Pricing"}
              onClick={(e) => {
                navigateTab(e);
              }}
            >
              Pricing
            </button>
            <button
              className=" hover:text-green-600 dark:text-white dark:hover:text-[#51D1B4]"
              value={"About"}
              onClick={(e) => {
                navigateTab(e);
              }}
            >
              About
            </button>
          </div>
          <div>
            <button onClick={toggleTheme}>
              <Switch
                active={active}
                handleChangeActive={handleChangeActive}
                toggle={toggle}
                setToggle={setToggle}
              />
            </button>
          </div>
          <div className="md:ml-4">
            {token ? (
              <div>
                <a
                  href="/dashboard"
                  className="w-28 text-center py-2 px-4 rounded-3xl text-white bg-green-600 dark:bg-transparent dark:border dark:border-[#51D1B4]  dark:hover:bg-[#51D1B4] dark:hover:text-slate-700"
                >
                  Dashboard
                </a>
              </div>
            ) : (
              <div
                className={
                  theme
                    ? "w-48 flex items-center text-sky-50"
                    : "w-48 flex items-center"
                }
              >
                <a
                  href="/login"
                  className="w-20 text-center py-1 px-4 rounded-3xl"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="w-24 text-center py-1 px-4 rounded-3xl text-sky-50 bg-green-600 hover:border hover:border-green-600 hover:bg-white hover:text-green-600 dark:bg-slate-800 dark:hover:text-slate-700 dark:hover:border-sky-50 dark:hover:bg-sky-50"
                >
                  Sign Up
                </a>
              </div>
            )}
          </div>
        </div>
        <div className="w-full md:w-0">
          <MobileNavMenu
            theme={theme}
            toggleTheme={toggleTheme}
            active={active}
            handleChangeActive={handleChangeActive}
            toggle={toggle}
            setToggle={setToggle}
            navigateTab={navigateTab}
          />
        </div>
      </div>
    </div>
  );
}

export default Nav;
