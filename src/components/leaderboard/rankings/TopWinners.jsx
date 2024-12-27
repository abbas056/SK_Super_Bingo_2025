import React, { useContext } from "react";
import { captureImageError, goTo } from "../../../js/helpers";
import beanIcon from "../../../assets/bean.png";
import { ApiContext } from "../../../services/Api";
import { baserUrl } from "../../../js/baserUrl";
import { frame1, frame2, frame3, unknown } from "../../../utils/images";

function TopWinners({ userName, userScore, userAvatar, userId, index, userLevel, actorLevel, tab1, subTabs, eventGifting, icon }) {
  const { isLive } = useContext(ApiContext);

  let levelUrl;
  let level;
  let lvlIconWidth;
  if (tab1) {
    levelUrl = `${baserUrl}streamkar/common/img/ulv/`;
    level = userLevel;
    lvlIconWidth = "12vw";
  } else if (eventGifting) {
    if (subTabs.Talents) {
      levelUrl = `${baserUrl}streamkar/common/img/tlv/`;
      level = actorLevel;
      lvlIconWidth = "7vw";
    } else if (subTabs.Gifters) {
      levelUrl = `${baserUrl}streamkar/common/img/ulv/`;
      level = userLevel;
      lvlIconWidth = "12vw";
    }
  } else {
    levelUrl = `${baserUrl}streamkar/common/img/tlv/`;
    level = actorLevel;
    lvlIconWidth = "7vw";
  }

  let rank = index + 1;

  return (
    <div className="innerData p-rel f-tangoItalic">
      <div className={rank == 1 ? "first-user" : "runner-user"}>
        <div
          onClick={() => {
            goTo(isLive, userId, userId);
          }}
        >
          <img onError={captureImageError} className="rank-user-image" src={userAvatar ? userAvatar : unknown} alt="" />
          <img className="rank-border-image p-rel" src={rank === 1 ? frame1 : rank === 2 ? frame2 : frame3} alt="" />
        </div>
      </div>
      <div
        className={
          rank === 1
            ? "bottom-data1 d-flex fd-column al-center jc-center"
            : rank === 2
            ? "bottom-data2 d-flex fd-column al-center jc-center"
            : "bottom-data3 d-flex fd-column al-center jc-center"
        }
      >
        <div className="username">{userName && userName.slice(0, 10)}</div>
        <img style={{ width: `${lvlIconWidth}` }} src={levelUrl + level + ".png"} alt="" />
        <div className="score-box d-flex fd-column al-center">
          <div className="points d-flex al-center jc-center gap-1">
            <img style={{ width: "5vw", height: "5vw" }} src={icon} alt="" />
            <span> {userScore}</span>
          </div>
          <div className="est-points d-flex al-center jc-center">
            <span>Est Beans:</span>
            <div className="d-flex al-center jc-center">
              <img style={{ width: "3.5vw", height: "3.5vw" }} src={beanIcon} alt="" />
              <span>00000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopWinners;
