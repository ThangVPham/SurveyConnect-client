import React from "react";
import Nav from "../components/Nav";
import Welcome from "../components/Welcome";
import Pricing from "../components/Pricing";
import About from "../components/About";
function Home({
  tab,
  darkTheme,
  toggleTheme,
  navigateTab,
  active,
  handleChangeActive,
  toggle,
  setToggle,
}) {
  return (
    <div className="h-screen dark:bg-[#0F172A] ">
      <Nav
        theme={darkTheme}
        toggleTheme={toggleTheme}
        navigateTab={navigateTab}
        active={active}
        handleChangeActive={handleChangeActive}
        toggle={toggle}
        setToggle={setToggle}
      />
      {tab === "Welcome" && <Welcome />}
      {tab === "Pricing" && <Pricing theme={darkTheme} />}
      {tab === "About" && <About theme={darkTheme} />}
    </div>
  );
}

export default Home;
