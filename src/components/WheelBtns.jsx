import React from "react";
import { luckyWheelBtn, VipluckyWheelBtn } from "../utils/images";

function WheelBtns({ wheelBtns, setwheelBtns }) {
  const tabSwitch = (id) => {
    let newCat = {
      Lucky: false,
      VipLucky: false,
    };
    setwheelBtns({ ...newCat, [id]: true });
  };
  return (
    <div className="wheel-buttons d-flex jc-center al-center m-auto p-rel">
      <button onClick={() => tabSwitch(`Lucky`)} className={wheelBtns.Lucky ? "btn-active" : "btn"}>
        <img src={luckyWheelBtn} alt="" />
      </button>
      <button onClick={() => tabSwitch(`VipLucky`)} className={wheelBtns.VipLucky ? "btn-active" : "btn"}>
        <img src={VipluckyWheelBtn} alt="" />
      </button>
    </div>
  );
}

export default WheelBtns;
