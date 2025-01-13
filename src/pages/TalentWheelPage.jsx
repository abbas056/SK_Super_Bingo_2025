import React, { useContext, useState } from "react";
import WheelGame from "../components/WheelGame";
import { ApiContext } from "../services/Api";
import LeaderBoard from "../components/leaderboard/LeaderBoad";
import { winnersTitle } from "../utils/images";

function TalentWheelPage({ tab2, wheelBtns, setwheelBtns }) {
  const { talentWheel } = useContext(ApiContext);

  return (
    <div className="mt-5vw">
      <WheelGame wheelBtns={wheelBtns} setwheelBtns={setwheelBtns} />
      <LeaderBoard title={winnersTitle} maxheight={"179vw"} restWinners={talentWheel?.list} arrayData={talentWheel} tab2={tab2} />
    </div>
  );
}

export default TalentWheelPage;
