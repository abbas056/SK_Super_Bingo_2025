import React from "react";

function GiftingSubButtons({ subBtn1name, subBtn2name, subTabs, setSubTabs }) {
  const tabSwitch = (id) => {
    let newCat = {
      [subBtn1name]: false,
      [subBtn2name]: false,
    };
    setSubTabs({ ...newCat, [id]: true });
  };
  return (
    <div className="giftingSub-buttons d-flex jc-center al-center m-auto gap-2">
      <button onClick={() => tabSwitch(`${subBtn1name}`)} className={subTabs[subBtn1name] ? "gray-0" : "gray-1"}>
        {subBtn1name}
      </button>
      <button onClick={() => tabSwitch(`${subBtn2name}`)} className={subTabs[subBtn2name] ? "gray-0" : "gray-1"}>
        {subBtn2name}
      </button>
    </div>
  );
}

export default GiftingSubButtons;
