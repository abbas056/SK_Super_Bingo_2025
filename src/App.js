import React, { useState } from "react";
import "./App.scss";
import { header } from "./utils/images";
import Marque from "./components/Marquee";
import MainButtons from "./components/MainButtons";
import PopupButtons from "./components/PopupButtons";
import { overFlowAuto, overFlowHidden } from "./js/helpers";
import LanguageBar from "./components/common/LanguageBar";

const App = () => {
  let [language, setLanguage] = useState("English");

  const [mainTabs, setMainTabs] = useState({
    tab1: true,
    tab2: false,
  });
  const [popup, setPopup] = useState({
    guide: false,
    eventGifting: false,
    details: false,
    records: false,
  });
  const popupSwitch = (id) => {
    let newCat = {
      guide: false,
      eventGifting: false,
      details: false,
      records: false,
    };
    setPopup({ ...newCat, [id]: true });
    overFlowHidden();
  };
  const close = () => {
    setPopup(false);
    overFlowAuto();
  };
  return (
    <div className="App">
      <LanguageBar setLanguage={setLanguage} language={language} />
      <img className="w-100 mb-4vw" src={header} alt="" />
      <Marque />
      <MainButtons mainTabs={mainTabs} setMainTabs={setMainTabs} />
      <PopupButtons mainTabs={mainTabs} popupSwitch={popupSwitch} close={close} popup={popup} language={language} />
    </div>
  );
};

export default App;
