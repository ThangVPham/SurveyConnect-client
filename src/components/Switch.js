import React from "react";
import Moon from "../assets/Moon.svg";
import Sun from "../assets/Sun.svg";

function Switch({ active, handleChangeActive, toggle, setToggle }) {
  const toggleClass = " transform translate-x-5";
  return (
    <div>
      <div
        className="md:w-11 md:h-6 w-full h-5 flex items-center bg-gray-200 rounded-full p-1 cursor-pointer dark:bg-slate-700"
        onClick={() => {
          setToggle(!toggle);
          handleChangeActive();
        }}
      >
        {/* Switch */}

        <div
          className={
            "bg-white md:w-4 md:h-4 h-3 w-3 rounded-full shadow-md transform duration-300 ease-in-out flex justify-center align-center dark:bg-slate-300" +
            (toggle ? null : toggleClass)
          }
        >
          {active ? (
            <img className="active w-3" src={Sun} alt="Sun" />
          ) : (
            <img className="inactive w-3" src={Moon} alt="Moon" />
          )}
        </div>
      </div>
    </div>
  );
}

export default Switch;
