import React, { useContext, useState } from "react";
import EventGifts from "../common/EventGifts";
import { cross, slicePlease } from "../../js/helpers";
import { beanIcon, beanPot, eventGiftingTitle, gemIcon, gemspot, leaderboardTitle } from "../../utils/images";
import SubButtons from "../common/SubButtons";
import GiftingSubButtons from "../GiftingSubButtons";
import BingoRewards from "../BingoRewards";
import { ApiContext } from "../../services/Api";
import LeaderBoard from "../leaderboard/LeaderBoad";
import { gifterDailyRewards, gifterOverallRewards, talentDailyRewards, talentOverallRewards } from "../../js/data";
import SliderItems from "../rewards-slider/SliderItems";

function EventGifting({ close, eventGifting }) {
  const {
    userInfo,
    talentDailyToday,
    talentDailyYesterday,
    talentOverall,
    gifterDailyToday,
    gifterDailyYesterday,
    gifterOverall,
    CurrentDate,
    PreviousDate,
  } = useContext(ApiContext);

  const [subTabs, setSubTabs] = useState({
    Talents: true,
    Gifters: false,
  });
  const [giftingSubButtons, setgiftingSubButtons] = useState({
    Daily: true,
    Overall: false,
  });
  const [giftingDayButtons, setgiftingDayButtons] = useState({
    Today: true,
    Yesterday: false,
  });

  let winners;
  let rewards;
  let overallRewards;
  let potImage;
  let beanPotValue;
  let icon;
  let gifterDailyTodayPot = `DAILY_USER_${CurrentDate}`;
  let gifterDailyYesterdayPot = `DAILY_USER_${PreviousDate}`;
  let talentDailyTodayPot = `DAILY_GEMS_${CurrentDate}`;
  let talentDailyYesterdayPot = `DAILY_GEMS_${PreviousDate}`;
  let overallPot = `OVERALL_BEANS`;

  if (subTabs.Talents) {
    potImage = gemspot;
    icon = gemIcon;
    if (giftingSubButtons.Daily) {
      rewards = talentDailyRewards;
      if (giftingDayButtons.Today) {
        winners = talentDailyToday;
        beanPotValue = userInfo?.beansPotInfo?.[talentDailyTodayPot];
      } else if (giftingDayButtons.Yesterday) {
        winners = talentDailyYesterday;
        beanPotValue = userInfo?.beansPotInfo?.[talentDailyYesterdayPot];
      }
    } else if (giftingSubButtons.Overall) {
      winners = talentOverall;
      overallRewards = talentOverallRewards;
    }
  } else if (subTabs.Gifters) {
    potImage = beanPot;
    icon = beanIcon;
    if (giftingSubButtons.Daily) {
      rewards = gifterDailyRewards;
      if (giftingDayButtons.Today) {
        winners = gifterDailyToday;
        beanPotValue = userInfo?.beansPotInfo?.[gifterDailyTodayPot];
      } else if (giftingDayButtons.Yesterday) {
        winners = gifterDailyYesterday;
        beanPotValue = userInfo?.beansPotInfo?.[gifterDailyYesterdayPot];
      }
    } else if (giftingSubButtons.Overall) {
      winners = gifterOverall;
      overallRewards = gifterOverallRewards;
    }
  }
  const topWinners = slicePlease(winners?.list, 0, 3);
  const restWinners = slicePlease(winners?.list, 3, winners?.list?.length);
  return (
    <div className="p-rel w-100 d-flex al-start jc-center f-tangoSansItalic" style={{ height: "100%" }}>
      <div className="event-gifting">
        <img className="title m-auto p-abs" src={eventGiftingTitle} alt="" />
        <div className="container fd-column d-flex al-center jc-center gap-2">
          <EventGifts />
          <div className="heading">Gifting Rewards</div>
          <div className="heading-text">Rewards for Talents and Gifters</div>
          <SubButtons subTabs={subTabs} setSubTabs={setSubTabs} subBtn1name={"Talents"} subBtn2name={"Gifters"} />
          <GiftingSubButtons subTabs={giftingSubButtons} setSubTabs={setgiftingSubButtons} subBtn1name={"Daily"} subBtn2name={"Overall"} />
          {giftingSubButtons.Overall ? null : (
            <GiftingSubButtons subTabs={giftingDayButtons} setSubTabs={setgiftingDayButtons} subBtn1name={"Today"} subBtn2name={"Yesterday"} />
          )}
          {giftingSubButtons.Overall ? (
            <SliderItems overallRewards={overallRewards} />
          ) : (
            <BingoRewards eventGifting={eventGifting} rewards={rewards} potImage={potImage} icon={icon} beanPotValue={beanPotValue} />
          )}
          <LeaderBoard
            title={leaderboardTitle}
            maxheight={"125vw"}
            topWinners={topWinners}
            restWinners={restWinners}
            arrayData={winners}
            eventGifting={eventGifting}
            icon={icon}
            subTabs={subTabs}
          />
        </div>
        <div className="close p-abs" onClick={close}>
          <img style={{ width: "10vw" }} src={cross()} alt="" />
        </div>
      </div>
    </div>
  );
}

export default EventGifting;
