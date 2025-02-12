import React from "react";

function SubButtons({ subBtn1name, subBtn2name, subTabs, setSubTabs }) {
  // States
  const tabSwitch = (id) => {
    let newCat = {
      [subBtn1name]: false,
      [subBtn2name]: false,
    };
    setSubTabs({ ...newCat, [id]: true });
  };
  return (
    <div className="sub-buttons d-flex jc-center al-center m-auto p-rel">
      <button onClick={() => tabSwitch(`${subBtn1name}`)} className={subTabs[subBtn1name] ? "btn-active" : "btn"}>
        {subBtn1name === "Today" ? "TODAY" : "TALENTS"}
      </button>
      <button onClick={() => tabSwitch(`${subBtn2name}`)} className={subTabs[subBtn2name] ? "btn-active" : "btn"}>
        {subBtn2name === "Previous" ? (
          <span>
            PREVIOUS <br /> DAY
          </span>
        ) : (
          "GIFTERS"
        )}
      </button>
    </div>
  );
}

export default SubButtons;
