import React, { useContext, useState } from "react";
import WheelGame from "../components/WheelGame";
import { slicePlease } from "../js/helpers";
import { ApiContext } from "../services/Api";
import LeaderBoard from "../components/leaderboard/LeaderBoad";
import { winnersTitle } from "../utils/images";

function TalentWheelPage({ tab2 }) {
  const { tickertapeLuckyWheel, tickertapeVipLuckyWheel } = useContext(ApiContext);
  const [wheelBtns, setwheelBtns] = useState({
    Lucky: true,
    VipLucky: false,
  });
  let winners;

  if (wheelBtns.Lucky) {
    winners = tickertapeLuckyWheel;
  } else {
    winners = tickertapeVipLuckyWheel;
  }
  const restWinners = slicePlease(winners?.list);
  return (
    <div className="mt-5vw">
      <WheelGame wheelBtns={wheelBtns} setwheelBtns={setwheelBtns} />
      <LeaderBoard title={winnersTitle} maxheight={"179vw"} restWinners={restWinners} arrayData={winners} tab2={tab2} />
    </div>
  );
}

export default TalentWheelPage;
