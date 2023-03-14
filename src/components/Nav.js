import React from "react";
import { Link } from "react-router-dom";
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
        <Link to="/" className="md:w-60 w-1/2 z-100">
          <img
            src={theme ? LogoWhite : Logo}
            alt="SurveyConnect"
            className="w-full "
          />
        </Link>
        <div className="w-full hidden md:flex md:justify-end  items-center">
          <div className="flex md:w-1/4 xl:w-72 justify-evenly">
            <button
              className=" hover:text-green-600 dark:text-white dark:hover:text-[#51D1B4]"
              value={"Welcome"}
              onClick={(e) => {
                navigateTab(e);
              }}
            >
              Home
            </button>
            <button
              className=" hover:text-green-600 dark:text-white dark:hover:text-[#51D1B4]"
              value={"Pricing"}
              onClick={(e) => {
                navigateTab(e);
              }}
            >
              Pricing
            </button>
            {/* <button
              className=" hover:text-green-600 dark:text-white dark:hover:text-[#51D1B4]"
              value={"About"}
              onClick={(e) => {
                navigateTab(e);
              }}
            >
              About
            </button> */}
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
