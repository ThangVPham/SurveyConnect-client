import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import Switch from "./Switch";
function MobileNavMenu({
  theme,
  toggleTheme,
  active,
  handleChangeActive,
  toggle,
  setToggle,
  navigateTab,
}) {
  const token = localStorage.getItem("token");

  const mobileMenu = (
    <FontAwesomeIcon icon={faBars} size={"xl"}></FontAwesomeIcon>
  );
  const menuCloseBtn = (
    <FontAwesomeIcon icon={faXmark} size={"xl"}></FontAwesomeIcon>
  );

  const [collapse, setCollapse] = useState(true);
  const collapseMenu = () => {
    setCollapse(!collapse);
  };
  return (
    <div className="relative md:hidden flex w-full flex-end ">
      <div
        className={
          collapse
            ? " md:hidden fixed text-end -right-5 -top-5 "
            : theme
            ? "flex justify-between md:hidden fixed text-end w-3/4 -right-5  top-0 items-center bg-slate-800/[0.9] text-white "
            : "flex justify-between md:hidden fixed text-end w-3/4 -right-5  top-0 items-center bg-green-600/[0.9] text-white "
        }
      >
        <div
          className={collapse ? "hidden" : "h-screen text-start ml-10 pt-16 "}
        >
          {/* Mobile Nav Items */}
          <div className="flex flex-col pb-2">
            <div className=" w-2/3">
              <button onClick={toggleTheme} className="w-full">
                <Switch
                  active={active}
                  handleChangeActive={handleChangeActive}
                  toggle={toggle}
                  setToggle={setToggle}
                />
              </button>
            </div>
            <button
              value={"Welcome"}
              onClick={(e) => {
                navigateTab(e);
              }}
              className=" p-2 hover:text-cyan-600"
            >
              Home
            </button>
            <button
              value={"Pricing"}
              onClick={(e) => {
                navigateTab(e);
              }}
              className=" p-2 hover:text-cyan-600"
            >
              Pricing
            </button>
          </div>
        </div>
        <div className=" h-screen">
          {collapse ? (
            <button
              className=" pt-8 pr-16 w-full dark:text-slate-200"
              onClick={() => collapseMenu()}
            >
              {mobileMenu}
            </button>
          ) : (
            <button
              className=" pt-4 pr-16 w-1/6"
              onClick={() => collapseMenu()}
            >
              {menuCloseBtn}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MobileNavMenu;
