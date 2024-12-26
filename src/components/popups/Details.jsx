import React from "react";
import { tab1Details, tab2Details } from "../../js/data";
import { cross } from "../../js/helpers";
import { detailsTitle } from "../../utils/images";

function Details({ close, mainTabs }) {
  let rewards;
  if (mainTabs.tab1) {
    rewards = tab1Details;
  } else {
    rewards = tab2Details;
  }
  return (
    <div className="details-popup f-tangoSans p-rel">
      <img className="title p-abs" src={detailsTitle} alt="" />
      <div className="inner-content m-auto">
        <div className="head d-flex w-100">
          <div className="w-20 bg-brown d-flex border-b">Button Name</div>
          <div className="w-20 bg-brown d-flex border-b">Game Points Required</div>
          <div className="w-60 bg-brown d-flex border-b">Rewards</div>
        </div>
        <div className="body d-flex w-100">
          <div className="d-flex fd-column w-100">
            {rewards?.data?.map((data, i) => (
              <div className="d-flex w-100" key={i}>
                <div className="box w-20 d-flex al-center jc-center">{data.button}</div>
                <div className="box w-20 d-flex al-center jc-center">{data.pointsReq}</div>
                <div className="box rewards-container d-flex al-center f-wrap jc-center gap-1 w-60">
                  {data.rewards.map((items, i) => {
                    return (
                      <div className=" d-flex fd-column al-center jc-center gap-1 w-30" key={i}>
                        <div className="rew-img d-flex al-center jc-center">
                          <img src={items.pic} alt="" />
                        </div>
                        <span className="details">{items.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="close p-abs" onClick={close}>
        <img src={cross()} alt="" />
      </div>
    </div>
  );
}

export default Details;
