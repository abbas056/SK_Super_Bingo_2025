import React from "react";
import SliderItems from "./rewards-slider/SliderItems";
import { rewardsTag } from "../utils/images";
import giftingRewardsBg from "../assets/popups/EventGifting/rewardsSection.png";
import tab1RewardsBg from "../assets/popups/largebg.png";

function BingoRewards({ giftingSubButtons, eventGifting, rewards, potImage, icon, beanPotValue }) {
  return (
    <div
      className="rewards-box p-rel m-auto d-flex fd-column al-center jc-sEven f-tangoItalic"
      style={
        eventGifting
          ? { backgroundImage: `url(${tab1RewardsBg})`, marginTop: " !important" }
          : { backgroundImage: `url(${tab1RewardsBg})`, marginTop: "12vw" }
      }
    >
      {eventGifting ? null : <img className="title p-abs" src={rewardsTag} alt="" />}
      <div className="rewards">
        <SliderItems rewards={rewards} eventGifting={eventGifting} giftingSubButtons={giftingSubButtons} />
      </div>
      <div className="beans-pot d-flex fd-column al-center jc-center gap-1 c-white p-rel">
        <div className="pot d-flex al-center jc-center">
          <span className="p-abs">Beans Pot</span>
          <img src={potImage} alt="" />
        </div>
        <div className="bean-num d-flex al-center jc-center gap-1">
          <img src={icon} alt="" />
          <span style={{ color: "white" }}>{beanPotValue ? beanPotValue : 0}</span>
        </div>
      </div>
    </div>
  );
}

export default BingoRewards;
