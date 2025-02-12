import React, { useContext } from "react";
import EventGifting from "./popups/EventGifting";
import Guide from "./popups/Guide";
import Details from "./popups/Details";
import Records from "./popups/Records";
import { ApiContext } from "../services/Api";

function PopupButtons({ popupSwitch, mainTabs, close, popup, language, history, gameRecords, loadMoreHistory, isLoading }) {
  const { disable } = useContext(ApiContext);

  return (
    <>
      <div className="popup-buttons">
        <button disabled={disable} className="p-fix guideBtn" onClick={() => popupSwitch("guide")}>
          Guide
        </button>
        <button style={{ fontSize: "2.8vw" }} disabled={disable} className="p-fix giftingBtn" onClick={() => popupSwitch("eventGifting")}>
          Event <br /> Gifitng
        </button>
        {mainTabs.tab1 ? (
          <button
            disabled={disable}
            className="p-abs DetailsBtn"
            style={mainTabs.tab1 ? { top: "145vw" } : { top: "174vw" }}
            onClick={() => popupSwitch("details")}
          >
            Details
          </button>
        ) : null}
        <button
          disabled={disable}
          className="p-abs RecordsBtn"
          style={mainTabs.tab1 ? { top: "145vw" } : { top: "170vw" }}
          onClick={() => popupSwitch("records")}
        >
          Records
        </button>
      </div>
      <div className="overlay" style={{ visibility: popup.guide ? "visible" : "hidden" }}>
        {popup.guide ? <Guide close={close} language={language} /> : null}
      </div>
      <div className="overlay" style={{ visibility: popup.eventGifting ? "visible" : "hidden" }}>
        {popup.eventGifting ? <EventGifting close={close} eventGifting={popup.eventGifting} /> : null}
      </div>
      <div className="overlay" style={{ visibility: popup.details ? "visible" : "hidden" }}>
        {popup.details ? <Details close={close} mainTabs={mainTabs} /> : null}
      </div>
      <div className="overlay" style={{ visibility: popup.records ? "visible" : "hidden" }}>
        {popup.records ? (
          <Records
            mainTabs={mainTabs}
            close={close}
            history={history}
            gameRecords={gameRecords}
            loadMoreHistory={loadMoreHistory}
            isLoading={isLoading}
          />
        ) : null}
      </div>
    </>
  );
}

export default PopupButtons;
