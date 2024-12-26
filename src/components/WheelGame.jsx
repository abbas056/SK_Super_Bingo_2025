import React, { useState } from "react";
import { talentPtsIcon, talentWheelTitle } from "../utils/images";
import WheelBtns from "./WheelBtns";
import LuckyWheel from "./Games/LuckyWheel";
import VipLuckyWheel from "./Games/VipLuckyWheel";

function WheelGame({ wheelBtns, setwheelBtns }) {
  return (
    <>
      <div className="wheel-game m-auto d-flex fd-column al-center jc-center p-rel f-tangoSansItalic gap-2">
        <div className="wheel-game-points d-flex al-center jc-center gap-1 m-auto p-abs">
          <img className="w-7vw" src={talentPtsIcon} alt="" /> <span>My Talent points:</span>: <span>0</span>
        </div>
        <img className="w-70" src={talentWheelTitle} alt="" />
        <WheelBtns wheelBtns={wheelBtns} setwheelBtns={setwheelBtns} />
        <div className="wheel-game-text">{wheelBtns.Lucky ? "25k" : "100k"} Talents Points = 1 Chance</div>
        <div className="wheel-game-container d-flex al-start jc-center">{wheelBtns?.Lucky ? <LuckyWheel /> : <VipLuckyWheel />}</div>
      </div>
    </>
  );
}

export default WheelGame;
