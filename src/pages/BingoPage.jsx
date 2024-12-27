import React, { useContext, useState } from "react";
import MyPoints from "../components/common/MyPoints";
import { beanIcon, beanPot, bingoWinsIcon, gamePointsIcon, leaderboardTitle } from "../utils/images";
import BingoGame from "../components/Games/BingoGame";
import BingoRewards from "../components/BingoRewards";
import LeaderBoard from "../components/leaderboard/LeaderBoad";
import { ApiContext } from "../services/Api";
import { slicePlease } from "../js/helpers";
import { tab1Rewards } from "./../js/data";

function BingoPage({ tab1 }) {
  const { userInfo, bingoToday, bingoPrevious, CurrentDate, PreviousDate } = useContext(ApiContext);
  const [subTabs, setSubTabs] = useState({
    Today: true,
    Previous: false,
  });
  let todayBeansPot = `bingo_beans_pot_${CurrentDate}`;
  let prevBeansPot = `bingo_beans_pot_${PreviousDate}`;
  let winners;
  let beansPot;
  if (subTabs.Today) {
    winners = bingoToday;
    beansPot = userInfo?.beansPotInfo?.[todayBeansPot];
  } else {
    winners = bingoPrevious;
    beansPot = userInfo?.beansPotInfo?.[prevBeansPot];
  }

  const gamePoints = userInfo?.gamePoints;
  const dailyWins = userInfo?.dailyScores;
  const topWinners = slicePlease(winners?.list, 0, 3);
  const restWinners = slicePlease(winners?.list, 3, winners?.list?.length);
  return (
    <div className="mt-5vw f-tangoSansItalic">
      <MyPoints tab1={tab1} icon={gamePointsIcon} text="My Game Points" value={gamePoints ? gamePoints : 0} />
      <BingoGame gamePoints={gamePoints} />
      <div className="bingo-wins d-flex al-center jc-center gap-1 m-auto">
        <img className="w-6vw" src={bingoWinsIcon} alt="" />
        Daily Bingo WIns: {dailyWins}
      </div>
      <BingoRewards beanPotValue={beansPot} potImage={beanPot} rewards={tab1Rewards} icon={beanIcon} />
      <LeaderBoard
        title={leaderboardTitle}
        maxheight={"125vw"}
        topWinners={topWinners}
        restWinners={restWinners}
        arrayData={winners}
        tab1={tab1}
        subBtn1name={"Today"}
        subBtn2name={"Previous"}
        subTabs={subTabs}
        setSubTabs={setSubTabs}
        icon={beanIcon}
      />
    </div>
  );
}

export default BingoPage;
