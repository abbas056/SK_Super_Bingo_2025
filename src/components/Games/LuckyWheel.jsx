import React, { useState } from "react";
import { luckyWheelInner, spinBtn } from "../../utils/images";

function LuckyWheel() {
  const [playCount, setplayCount] = useState(1);
  const playanimation = (i) => {
    setplayCount(i);
  };
  return (
    <div className="luckyWheel-Game d-flex fd-column al-center jc-center gap-3">
      <div className="luckyWheel-Game-wheel p-rel">
        <img className="inner p-abs" src={luckyWheelInner} alt="" />
      </div>
      <div className="luckyWheel-Game-speed d-flex jc-center al-center gap-2">
        <button className={playCount === 1 ? "gray-0" : "gray-1"} onClick={() => playanimation(1)}>
          x1
        </button>
        <button className={playCount === 10 ? "gray-0" : "gray-1"} onClick={() => playanimation(10)}>
          x10
        </button>
        <button className={playCount === 100 ? "gray-0" : "gray-1"} onClick={() => playanimation(100)}>
          x100
        </button>
      </div>
      <button className="luckyWheel-Game-spin-btn">
        <img src={spinBtn} alt="" />
      </button>
    </div>
  );
}

export default LuckyWheel;
