import React from "react";
import BingoGrid from "./../BingoGrid";
import { beanIcon } from "../../utils/images";

function BingoGame({ gamePoints }) {
  return (
    <div className="bingo-game d-flex fd-column al-center jc-start m-auto">
      <div className="info-text d-flex al-center jc-center gap-1 m-auto">
        Win Bingo & get
        <span className="c-yellow d-flex al-center sjc-center">
          1777 <img className="w-5vw" src={beanIcon} alt="" /> Rewards
        </span>
      </div>
      <BingoGrid gamePoints={gamePoints} />
    </div>
  );
}

export default BingoGame;
