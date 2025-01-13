import React, { useContext } from "react";
import BingoPage from "../pages/BingoPage";
import TalentWheelPage from "../pages/TalentWheelPage";
import { bingoBtn, talentWheelBtn } from "../utils/images";
import { ApiContext } from "../services/Api";

function MainButtons({ mainTabs, setMainTabs, wheelBtns, setwheelBtns }) {
  const { disable } = useContext(ApiContext);

  const tabSwitch = (id) => {
    let newCat = {
      tab1: false,
      tab2: false,
    };
    setMainTabs({ ...newCat, [id]: true });
  };
  const renderingTabs = () => {
    switch (true) {
      case mainTabs.tab1:
        return <BingoPage tab1={mainTabs.tab1} />;
      case mainTabs.tab2:
        return <TalentWheelPage tab2={mainTabs.tab2} wheelBtns={wheelBtns} setwheelBtns={setwheelBtns} />;
    }
  };
  return (
    <>
      <div className="tab-buttons p-rel z-index-1 d-flex jc-sEven m-auto">
        <button disabled={disable} className={mainTabs.tab1 ? "active" : "not-active d-flex al-center jc-center"} onClick={() => tabSwitch("tab1")}>
          <img src={bingoBtn} alt="" />
        </button>
        <button disabled={disable} className={mainTabs.tab2 ? "active" : "not-active d-flex al-center jc-center"} onClick={() => tabSwitch("tab2")}>
          <img src={talentWheelBtn} alt="" />
        </button>
      </div>
      <div>{renderingTabs()}</div>
    </>
  );
}

export default MainButtons;
