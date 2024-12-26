import React, { useContext } from "react";
import { captureImageError, formatData, goTo } from "../../../js/helpers";
import { baserUrl } from "../../../js/baserUrl";
import beanIcon from "../../../assets/bean.png";
import { ApiContext } from "../../../services/Api";
import { onwardFrame, unknown } from "../../../utils/images";

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
  tab3,
  desc,
  subTabs,
  eventGifting,
  icon,
}) {
  const { isLive } = useContext(ApiContext);

  let levelUrl;
  let level;

  if (tab1 || eventGifting || tab2) {
    levelUrl = `${baserUrl}streamkar/common/img/ulv/`;
    level = userLevel;
  }
  // else if (eventGifting) {
  //   if (subTabs.Talents) {
  //     levelUrl = `${baserUrl}streamkar/common/img/tlv/`;
  //     level = actorLevel;
  //     icon = `${baserUrl}streamkar/rewards/gems.png`;
  //   } else {
  //     levelUrl = `${baserUrl}streamkar/common/img/ulv/`;
  //     level = userLevel;
  //     icon = beanIcon;
  //   }
  // } else if (tab3) {
  //   levelUrl = `${baserUrl}streamkar/common/img/tlv/`;
  //   level = actorLevel;
  //   icon = beanIcon;
  // } else {
  //   levelUrl = `${baserUrl}streamkar/common/img/ulv/`;
  //   level = userLevel;
  //   icon = beanIcon;
  // }
  // let arrayDesc = desc && JSON.parse(desc);
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
              <img style={{ width: "10vw" }} src={levelUrl + level + ".png"} alt="" />
            </div>
          </div>
        </div>
        <div className="est-rew d-flex al-center jc-start gap-1">
          <img style={{ width: "5vw", height: "5vw" }} src={icon} alt="" />
          <span>00000</span>
        </div>
      </div>
    </>
  );
}

export default RestWinners;
