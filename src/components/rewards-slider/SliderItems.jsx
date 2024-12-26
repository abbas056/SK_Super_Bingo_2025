import React from "react";
import RewardSlider, { CarouselItem } from "./RewardSlider";
import { tab1Rewards } from "../../js/data";
function SliderItems({ rewards, overallRewards, eventGifting }) {
  return (
    <>
      {rewards?.length > 0 && (
        <div className="rewards-slider m-auto">
          <div className="sliderItem d-flex fd-column m-auto p-rel">
            <RewardSlider>
              {rewards &&
                rewards?.map((item, i) => {
                  let index = i + 1;
                  return (
                    <CarouselItem key={i}>
                      <div className="inner-box d-flex fd-column al-center jc-center f-tangoItalic p-rel" key={i}>
                        <div className="rank d-flex fd-column al-center jc-center">
                          <span>
                            Top {index}{" "}
                            {index === 1 ? (
                              <sup style={{ marginLeft: "-0.7vw" }}>st</sup>
                            ) : index === 2 ? (
                              <sup style={{ marginLeft: "-0.7vw" }}>nd</sup>
                            ) : index === 3 ? (
                              <sup style={{ marginLeft: "-0.7vw" }}>rd</sup>
                            ) : (
                              <sup style={{ marginLeft: "-0.7vw" }}>th</sup>
                            )}
                          </span>
                        </div>
                        <div className="rewardImg d-flex al-center jc-center gap-4">
                          {item?.frame?.map((_items, index) => (
                            <div className="img-box d-flex fd-column al-center jc-center" key={index}>
                              <img src={_items.pic} alt="" key={index} />
                            </div>
                          ))}
                        </div>
                        <div className="desc d-flex fd-column jc-center al-center">{item.desc}</div>
                      </div>
                    </CarouselItem>
                  );
                })}
            </RewardSlider>
          </div>
        </div>
      )}

      {overallRewards?.length > 0 && (
        <div className="rewards-slider-overall  m-auto">
          <div className="sliderItem d-flex fd-column m-auto p-rel">
            <RewardSlider>
              {overallRewards &&
                overallRewards?.map((item, i) => {
                  let index = i + 1;
                  return (
                    <CarouselItem key={i}>
                      <div className="inner-box d-flex fd-column al-center jc-center f-tangoItalic" key={i}>
                        <div className="rank d-flex fd-column al-center jc-center p-abs">
                          <span>
                            Top {index} {index === 1 ? <sup>st</sup> : index === 2 ? <sup>nd</sup> : <sup>rd</sup>}
                          </span>
                          <span>{item.target}</span>
                        </div>
                        <div className="rewardImg d-flex al-start jc-center">
                          {item?.frame?.map((_items, index) => (
                            <div className="rewardImg-box d-flex fd-column al-center jc-start gap-1">
                              <div className="img-box d-flex al-center jc-center" key={index}>
                                <img src={_items.pic} alt="" />
                              </div>
                              <div className="desc d-flex jc-center al-center">{_items.desc}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CarouselItem>
                  );
                })}
            </RewardSlider>
          </div>
        </div>
      )}
    </>
  );
}

export default SliderItems;
