import React, { useContext } from "react";
import { luckyWheelBtn, VipluckyWheelBtn } from "../utils/images";
import { ApiContext } from "../services/Api";

function WheelBtns({ wheelBtns, setwheelBtns }) {
  const { disable } = useContext(ApiContext);

  const tabSwitch = (id) => {
    let newCat = {
      Lucky: false,
      VipLucky: false,
    };
    setwheelBtns({ ...newCat, [id]: true });
  };
  return (
    <div className="wheel-buttons d-flex jc-center al-center m-auto p-rel">
      <button disabled={disable} onClick={() => tabSwitch(`Lucky`)} className={wheelBtns.Lucky ? "btn-active" : "btn"}>
        <img src={luckyWheelBtn} alt="" />
      </button>
      <button disabled={disable} onClick={() => tabSwitch(`VipLucky`)} className={wheelBtns.VipLucky ? "btn-active" : "btn"}>
        <img src={VipluckyWheelBtn} alt="" />
      </button>
    </div>
  );
}

export default WheelBtns;
