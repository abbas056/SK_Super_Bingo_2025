import React, { useContext, useState } from "react";
import { talentPtsIcon, talentWheelTitle } from "../utils/images";
import WheelBtns from "./WheelBtns";
import LuckyWheel from "./Games/LuckyWheel";
import VipLuckyWheel from "./Games/VipLuckyWheel";
import { ApiContext } from "../services/Api";
import luckywheelbg from "../assets/wheelGameBg.png";
import vipwheelbg from "../assets/vipGame-bg.png";

function WheelGame({ wheelBtns, setwheelBtns }) {
  const { userInfo } = useContext(ApiContext);
  const talentPoints = userInfo?.talentPoints;
  return (
    <>
      <div
        className="wheel-game m-auto d-flex fd-column al-center jc-center p-rel f-tangoSansItalic gap-2"
        style={wheelBtns.Lucky ? { backgroundImage: `url(${luckywheelbg})` } : { backgroundImage: `url(${vipwheelbg})` }}
      >
        <div className="wheel-game-points d-flex al-center jc-center gap-1 m-auto p-abs">
          <img className="w-6vw" src={talentPtsIcon} alt="" /> <span>My Talent points:</span>: <span>{talentPoints ? talentPoints : 0}</span>
        </div>
        <img className="w-70" src={talentWheelTitle} alt="" />
        <WheelBtns wheelBtns={wheelBtns} setwheelBtns={setwheelBtns} />
        <div className="wheel-game-text">{wheelBtns.Lucky ? "25k" : "100k"} Talents Points = 1 Chance</div>
        <div className="wheel-game-container d-flex al-start jc-center">
          {wheelBtns?.Lucky ? <LuckyWheel talentPoints={talentPoints} /> : <VipLuckyWheel talentPoints={talentPoints} />}
        </div>
      </div>
    </>
  );
}

export default WheelGame;
