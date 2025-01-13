import React from "react";
import SliderItems from "./rewards-slider/SliderItems";
import { rewardsTag } from "../utils/images";
import giftingRewardsBg from "../assets/popups/EventGifting/rewardsSection.png";
import tab1RewardsBg from "../assets/popups/largebg.png";

function BingoRewards({ tab1, subTabs, giftingSubButtons, eventGifting, rewards, potImage, icon, beanPotValue }) {
  return (
    <>
      {tab1 || subTabs?.Gifters ? (
        <div
          className="rewards-box2 p-rel m-auto d-flex al-center jc-sEven "
          style={
            tab1
              ? { backgroundImage: `url(${giftingRewardsBg})`, marginTop: "6vw", width: "90%" }
              : { backgroundImage: `url(${giftingRewardsBg})`, width: "90%" }
          }
        >
          {eventGifting ? null : <img className="title p-abs" src={rewardsTag} alt="" />}
          <div className="beans-pot d-flex fd-column al-center jc-center gap-1 c-white p-rel">
            <div className="pot d-flex al-center jc-center">
              <span className="p-abs">Beans Pot</span>
              <img src={potImage} alt="" />
            </div>
            <div className="bean-num d-flex al-center jc-center">
              <img src={icon} alt="" />
              <span style={{ color: "white" }}>{beanPotValue ? beanPotValue : 0}</span>
            </div>
          </div>
          <div className="rewards">
            <SliderItems tab1={tab1} subTabs={subTabs} rewards={rewards} eventGifting={eventGifting} giftingSubButtons={giftingSubButtons} />
          </div>
        </div>
      ) : (
        <div
          className="rewards-box p-rel m-auto d-flex fd-column al-center jc-sEven "
          style={
            eventGifting
              ? { backgroundImage: `url(${tab1RewardsBg})`, marginTop: " !important", width: "90%" }
              : { backgroundImage: `url(${tab1RewardsBg})`, marginTop: "12vw", width: "95%" }
          }
        >
          {eventGifting ? null : <img className="title p-abs" src={rewardsTag} alt="" />}
          <div className="rewards">
            <SliderItems rewards={rewards} eventGifting={eventGifting} giftingSubButtons={giftingSubButtons} />
          </div>
          <div className="beans-pot d-flex fd-column al-center jc-center gap-1 c-white p-rel">
            <div className="pot d-flex al-center jc-center">
              <span className="p-abs">Gems Pot</span>
              <img src={potImage} alt="" />
            </div>
            <div className="bean-num d-flex al-center jc-center">
              <img src={icon} alt="" />
              <span style={{ color: "white" }}>{beanPotValue ? beanPotValue : 0}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BingoRewards;
