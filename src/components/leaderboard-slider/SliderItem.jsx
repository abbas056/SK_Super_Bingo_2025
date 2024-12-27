import React from "react";
import { rewardImages } from "../../utils/images";

const SliderItem = ({ item }) => {
  return (
    <div className="slider-item d-flex fd-column al-center jc-center gap-1" style={{ width: "9vw" }}>
      <img style={{ width: "5vw", height: "5vw" }} src={rewardImages(item.desc)} />
      {
        <span className="desc" style={{ fontSize: "1.8vw", color: "white", textAlign: "center" }}>
          x
          {item.desc === "Coins" || item.desc === "Beans" || item.desc === "Gems" ? (
            <>{item.count}</>
          ) : (
            <>
              {item.count} {item.count === 1 ? "day" : "days"}
            </>
          )}
        </span>
      }
    </div>
  );
};

export default SliderItem;
