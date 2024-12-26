import React from "react";
import EventGifting from "./popups/EventGifting";
import Guide from "./popups/Guide";
import Details from "./popups/Details";
import Records from "./popups/Records";

function PopupButtons({ popupSwitch, mainTabs, close, popup, language }) {
  return (
    <>
      <div className="popup-buttons">
        <button className="p-fix " onClick={() => popupSwitch("guide")}>
          Guide
        </button>
        <button className="p-fix " onClick={() => popupSwitch("eventGifting")}>
          Event <br /> Gifitng
        </button>
        <button className="p-abs " style={mainTabs.tab1 ? { top: "150vw" } : { top: "132vw" }} onClick={() => popupSwitch("details")}>
          Details
        </button>
        <button className="p-abs " style={mainTabs.tab1 ? { top: "150vw" } : { top: "132vw" }} onClick={() => popupSwitch("records")}>
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
        {popup.records ? <Records mainTabs={mainTabs} close={close} /> : null}
      </div>
    </>
  );
}

export default PopupButtons;
