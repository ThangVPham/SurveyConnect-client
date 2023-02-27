import React, { useState } from "react";
import "./About.css";

import greenMountain from "../assets/GreenMountain.svg";

import DarkMode from "../assets/greenDarkMode.svg";

const About = ({ theme }) => {
  return (
    <div className={theme ? "dark" : ""}>
      <div className="">
        <div className="flex flex-col">
          <h1 className="flex justify-center text-4xl pt-6 dark:text-white">
            We are &nbsp;
            <h1 className="text-green-600 dark:text-sky-400">
              Survey Connect!
            </h1>
          </h1>
          <p className="flex justify-center pt-3 pb-15 text-md italic dark:text-white">
            Collecting and analyzing survey data made easier, faster and more
            efficient.
          </p>
        </div>
        <div className="flex flex-col-reverse md:flex-row md:justify-around dark:bg-[#0F172A]">
          <div className="flex h-96 mt-5">
            <img
              src={theme === false ? greenMountain : DarkMode}
              alt="mountain"
            />
          </div>
          <div className="flex md:flex-row  justify-center dark:bg-[#0F172A] ">
            <div className="w-full max-w-sm p-7 bg-white border border-gray-200 dark:border-[#51D1B4] rounded-lg shadow sm:p-8  m-4 justify-center dark:bg-slate-800">
              <div className="flex w-96 pt-15 pr-20  ">
                <p className="flex justify-center center text-sm italic dark:text-white">
                  Our mission is to empower people with the tools they need to
                  conduct effective surveys and make informed decisions.
                  <br />
                  <br />
                  Whether you're looking to understand your customers needs,
                  evaluate employee satisfaction, or gather feedback on a
                  product or service, Survey Connect is the solution you need.
                  <br />
                  <br />
                  With features like custom branding, multi-language support,
                  and real-time reporting, Survey Connect provides a complete
                  survey solution. Our team of experts is dedicated to providing
                  the highest level of customer support, and our commitment to
                  privacy and security ensures that your data is always safe and
                  secure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
