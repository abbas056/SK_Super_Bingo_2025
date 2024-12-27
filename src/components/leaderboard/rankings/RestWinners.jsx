import React, { useContext } from "react";
import { captureImageError, formatData, goTo } from "../../../js/helpers";
import { baserUrl } from "../../../js/baserUrl";
import { ApiContext } from "../../../services/Api";
import { onwardFrame, unknown } from "../../../utils/images";
import LeaderBoardSlider from "./../../leaderboard-slider/LeaderBoardSlider";

function RestWinners({
  userName,
  userScore,
  userAvatar,
  index,
  userId,
  listNumber,
  userLevel,
  actorLevel,
  tab1,
  tab2,
  desc,
  eventGifting,
  icon,
  subTabs,
}) {
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
  let arrayDesc = desc && JSON.parse(desc);
  return (
    <>
      <div className="users-details-onward f-tangoItalic" key={index}>
        <div className="d-flex al-center p-rel jc-center">
          <div className="rank-id d-flex al-center jc-center">{listNumber}.</div>
          <div className="d-flex al-center gap-1">
            <div
              onClick={() => {
                goTo(isLive, userId, userId);
              }}
            >
              <img onError={captureImageError} className="rank-user-image" src={userAvatar ? userAvatar : unknown} alt="" />
              <img className="rank-border-image p-rel" src={onwardFrame} alt="" />
            </div>
            <div className="user-info d-flex fd-column gap-1">
              <span className="username">{userName && userName.slice(0, 12)}</span>
              <img style={{ width: `${lvlIconWidth}` }} src={levelUrl + level + ".png"} alt="" />
            </div>
          </div>
        </div>
        {tab2 ? (
          <div className="rewards-slide d-flex al-center jc-end gap-1">
            <LeaderBoardSlider description={formatData(arrayDesc)} />
          </div>
        ) : (
          <div className="est-rew d-flex al-center jc-start">
            <img style={{ width: "4vw", height: "4vw" }} src={icon} alt="" />
            <span>{userScore}</span>
          </div>
        )}
      </div>
    </>
  );
}

export default RestWinners;
