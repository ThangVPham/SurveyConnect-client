import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "pages/Dashboard";
import Home from "pages/Home";
import Register from "pages/Register";
import Login from "pages/Login";
import Survey from "pages/Survey";
import ASLSurvey from "pages/ASLSurvey";
import AccessCode from "pages/AccessCode";
import SurveyEdit from "pages/SurveyEdit";
import UserProfile from "pages/UserProfile";

import NewSurvey from "pages/NewSurvey";
function App() {
  //Set theme to light by default if user hasn't set theme
  const theme = JSON.parse(localStorage.getItem("darkTheme")) ?? true;
  const themeIcon = JSON.parse(localStorage.getItem("themeIcon")) ?? false;
  const [darkTheme, setDarkTheme] = useState(theme);
  const [active, setActive] = useState(themeIcon);

  const handleChangeActive = () => {
    setActive((oldIcon) => {
      localStorage.setItem("themeIcon", JSON.stringify(!oldIcon));
      return !oldIcon;
    });
  };

  const [toggle, setToggle] = useState(themeIcon);
  //Toggle b/w dark/light
  const toggleTheme = () => {
    setDarkTheme((oldTheme) => {
      //Save user theme preference
      localStorage.setItem("darkTheme", JSON.stringify(!oldTheme));
      return !oldTheme;
    });
  };

  const [tab, setTab] = useState("Welcome");
  //Change tab
  const navigateTab = (e) => {
    setTab(e.target.value);
  };
  return (
    <div className={darkTheme ? "dark" : ""}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                theme={darkTheme}
                tab={tab}
                toggleTheme={toggleTheme}
                navigateTab={navigateTab}
                darkTheme={darkTheme}
                active={active}
                handleChangeActive={handleChangeActive}
                toggle={toggle}
                setToggle={setToggle}
              />
            }
          />
          <Route path="/register" element={<Register theme={darkTheme} />} />
          <Route path="/login" element={<Login theme={darkTheme} />} />
          <Route path="/dashboard" element={<Dashboard theme={theme} />} />
          <Route path="/survey/asl" element={<ASLSurvey theme={theme} />} />
          <Route path="/survey/:id" element={<Survey theme={theme} />} />

          <Route
            path="/surveyedit/:id"
            element={<SurveyEdit theme={theme} />}
          />
          <Route path="/verify" element={<AccessCode theme={theme} />} />
          <Route path="/user/" element={<UserProfile theme={theme} />} />

          <Route path="/newsurvey" element={<NewSurvey theme={theme} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
