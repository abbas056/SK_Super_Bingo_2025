import React, { useContext, useEffect, useState } from "react";
import "./App.scss";
import { btnUp, header } from "./utils/images";
import Marque from "./components/Marquee";
import MainButtons from "./components/MainButtons";
import PopupButtons from "./components/PopupButtons";
import { overFlowAuto, overFlowHidden } from "./js/helpers";
import LanguageBar from "./components/common/LanguageBar";
import Footer from "./components/common/Footer";
import { ApiContext } from "./services/Api";
import axios from "axios";
import { baserUrl } from "./js/baserUrl";

const App = () => {
  let [language, setLanguage] = useState("English");
  const [showBtnUp, setShowBtnUp] = useState(false);
  const [history, setHistory] = useState(false);
  const [gameRecords, setgameRecords] = useState([]);
  const [loadMore, setLoadMore] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { userId, userInfo } = useContext(ApiContext);

  const [mainTabs, setMainTabs] = useState({
    tab1: true,
    tab2: false,
  });
  const [wheelBtns, setwheelBtns] = useState({
    Lucky: true,
    VipLucky: false,
  });
  let recordType;
  if (mainTabs?.tab1) {
    recordType = 1;
  } else if (mainTabs?.tab2) {
    if (wheelBtns.Lucky) {
      recordType = 2;
    } else if (wheelBtns.VipLucky) {
      recordType = 3;
    }
  }
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
    setHistory(false);
    setLoadMore(1);
  };

  useEffect(() => {
    function handleScroll() {
      if (window.pageYOffset > 100) {
        setShowBtnUp(true);
      } else {
        setShowBtnUp(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const loadMoreHistory = () => {
    setLoadMore(loadMore + 1);
  };
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `${baserUrl}api/activity/eidF/getRecordInfo?eventDesc=20250124_bingo&rankIndex=21&pageNum=${loadMore}&pageSize=20&type=${recordType}&userId=${userId}`
      )
      .then((response) => {
        if (loadMore >= 2) {
          setgameRecords((prev) => [...prev, response?.data?.data?.list]);
        } else {
          setgameRecords([response?.data?.data?.list]);
        }
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [mainTabs, wheelBtns, userInfo, loadMore, userId]);

  return (
    <div className="App">
      <LanguageBar setLanguage={setLanguage} language={language} />
      <img className="w-100 mb-1vw" src={header} alt="" />
      <Marque mainTabs={mainTabs} />
      <MainButtons mainTabs={mainTabs} setMainTabs={setMainTabs} wheelBtns={wheelBtns} setwheelBtns={setwheelBtns} />
      <PopupButtons
        mainTabs={mainTabs}
        popupSwitch={popupSwitch}
        close={close}
        popup={popup}
        language={language}
        history={history}
        gameRecords={gameRecords}
        loadMoreHistory={loadMoreHistory}
        isLoading={isLoading}
      />
      <Footer />
      {showBtnUp && (
        <button className="btn-up" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <img src={btnUp} alt="" />
        </button>
      )}
    </div>
  );
};

export default App;
