import React from "react";
import { eventGifts } from "../../js/data";
import bean from "../../assets/bean.png";

function EventGifts() {
  return (
    <div className="event-gifts d-flex fd-column al-center jc-center gap-4 f-tangoSansItalic p-rel">
      <div className="heading p-abs fw-bold">Event Gifts</div>
      <div className="gifts d-flex al-center jc-sEven p-rel">
        {eventGifts.map((item, index) => (
          <div className="gifts-box d-flex fd-column al-center jc-center gap-1 p-rel" key={index}>
            <div className="gifts-box-frame d-flex fd-column al-center jc-center gap-1">
              <img src={item.img} alt="" />
            </div>
            <div className="gifts-box-name fw-bold">{item.name}</div>
            <div className="gifts-box-cost p-abs d-flex al-center jc-center">
              <img src={bean} alt="" />
              <span>{item.cost}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventGifts;
