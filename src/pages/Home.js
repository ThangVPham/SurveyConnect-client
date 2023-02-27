import React from "react";
import Nav from "../components/Nav";
import Welcome from "../components/Welcome";
import Pricing from "../components/Pricing";
import About from "../components/About";
function Home({
  theme,
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
    <div className={theme ? "h-screen bg-[#0F172A] " : "h-screen"}>
      <Nav
        theme={darkTheme}
        toggleTheme={toggleTheme}
        tab={tab}
        navigateTab={navigateTab}
        active={active}
        handleChangeActive={handleChangeActive}
        toggle={toggle}
        setToggle={setToggle}
      />
      {tab === "Welcome" && <Welcome theme={theme} />}
      {tab === "Pricing" && <Pricing theme={theme} />}
      {tab === "About" && <About theme={theme} />}
    </div>
  );
}

export default Home;
