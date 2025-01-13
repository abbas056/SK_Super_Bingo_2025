import React, { useContext } from "react";
import { captureImageError, estBeans, estBeansGifitng, formatData, goTo } from "../../../js/helpers";
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
  giftingSubButtons,
  icon,
  subTabs,
  beansPotValue,
  giftingDayButtons,
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
          <div className="d-flex al-center">
            <div
              onClick={() => {
                goTo(isLive, userId, userId);
              }}
            >
              <img onError={captureImageError} className="rank-user-image" src={userAvatar ? userAvatar : unknown} alt="" />
              <img className="rank-border-image p-rel" src={onwardFrame} alt="" />
            </div>
            <div className="user-info d-flex fd-column">
              <span className="username">{userName && userName.slice(0, 12)}</span>
              <img style={{ width: `${lvlIconWidth}` }} src={levelUrl + level + ".png"} alt="" />
            </div>
          </div>
        </div>
        {tab2 ? (
          <div className="rewards-slide d-flex al-center jc-end gap-1">
            <LeaderBoardSlider description={formatData(arrayDesc)} />
          </div>
        ) : eventGifting && subTabs.Talents && giftingSubButtons.Daily ? (
          <>
            {listNumber <= 5 && (
              <div className="est-points d-flex fd-column al-center jc-center">
                <span>{giftingDayButtons.Today ? "Est Gems:" : "Gems Won:"}</span>
                <div className="d-flex al-center jc-center">
                  <img style={{ width: "4vw", height: "4vw" }} src={icon} alt="" />
                  {estBeansGifitng(eventGifting, subTabs, beansPotValue, listNumber)}
                </div>
              </div>
            )}
            <div className="est-rew d-flex al-center jc-start gap-1">
              <img style={{ width: "4vw", height: "4vw" }} src={icon} alt="" />
              <span style={{ fontSize: "2.7vw" }}>{userScore}</span>
            </div>
          </>
        ) : (
          <div className="est-rew d-flex al-center jc-start gap-1">
            <img style={{ width: "4vw", height: "4vw" }} src={icon} alt="" />
            <span style={tab1 ? { fontSize: "3.5vw" } : { fontSize: "2.7vw" }}>{userScore}</span>
          </div>
        )}
      </div>
    </>
  );
}

export default RestWinners;
