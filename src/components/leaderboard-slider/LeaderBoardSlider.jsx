import React, { useEffect, useRef, useState } from "react";
import SliderItem from "./SliderItem";

const LeaderBoardSlider = ({ description, tab2, tab3 }) => {
  //   debugger;

  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const slideInterval = 2000;

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % description?.length);
    }, slideInterval);

    return () => {
      clearInterval(slideTimer);
    };
  }, [description?.length, slideInterval]);

  useEffect(() => {
    const handleTransitionEnd = () => {
      sliderRef?.current?.classList?.remove("sliding");
    };
    sliderRef?.current?.addEventListener("transitionend", handleTransitionEnd);
    return () => {
      sliderRef?.current?.removeEventListener("transitionend", handleTransitionEnd);
    };
  }, []);

  return (
    <div className="leaderboard-slider ">
      <div
        ref={sliderRef}
        className="slider-wrapper p-rel d-flex al-center jc-center gap-1"
        style={{
          transition: "transform 0.5s ease",
        }}
      >
        {description?.length && description[currentIndex]?.map((item, index) => <SliderItem item={item} key={index} />)}
      </div>
    </div>
  );
};

export default LeaderBoardSlider;
