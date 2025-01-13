import React, { useContext } from "react";
import FastMarquee from "react-fast-marquee";
import { ApiContext } from "../services/Api";
import { goTo, slicePlease } from "../js/helpers";
import borderImg from "../assets/TickerTapeFrame.png";
import { unknown } from "../utils/images";
function Marque({ mainTabs }) {
  const { bingoToday, isLive, tickertapeTab2 } = useContext(ApiContext);
  let tab1winners = slicePlease(bingoToday?.list, 0, 3);
  let tab2winners = tickertapeTab2?.list;

  return (
    <>
      {mainTabs.tab1 && bingoToday?.count > 0 && (
        <div className="marque-container f-tangoSansItalic">
          <FastMarquee direction="left" gradient={false} gradientColor={[0, 0, 0]} speed={70}>
            {tab1winners?.map((item, index) => {
              const userId = item.userId;
              const rank = index + 1;
              return (
                <div className="marquee-alternative" key={index}>
                  <div className="taxts d-flex al-center p-rel">
                    <div
                      className="d-flex jc-center al-center"
                      onClick={() => {
                        goTo(isLive, userId, userId);
                      }}
                    >
                      <img className="border-img p-abs" src={borderImg} alt="" />
                    </div>
                    <img className="user-img p-abs" src={item.portrait ? item.portrait : unknown} alt="" />
                    <div className="text">
                      <div className="content d-flex al-center fd-row">
                        <span className="nick-name">{item.nickname}</span>
                        <p className="d-flex al-center jc-center ">
                          has Won
                          <span className="c-yellow" style={{ marginRight: "1vw" }}>
                            {item.userScore}
                          </span>
                          BINGO games & has ranked
                          <span className="c-yellow" style={{ marginRight: "1vw" }}>
                            {rank}
                            {rank === 1 ? (
                              <sup style={{ marginLeft: "0.7vw" }}>st</sup>
                            ) : rank === 2 ? (
                              <sup style={{ marginLeft: "0.7vw" }}>nd</sup>
                            ) : (
                              <sup style={{ marginLeft: "0.7vw" }}>rd</sup>
                            )}
                          </span>
                          in BINGO game.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </FastMarquee>
        </div>
      )}

      {mainTabs.tab2 && tickertapeTab2?.count > 0 && (
        <div className="marque-container f-tangoSansItalic">
          <FastMarquee direction="left" gradient={false} gradientColor={[0, 0, 0]} speed={70}>
            {tab2winners?.map((item, index) => {
              const userId = item.userId;
              const parsedDesc = JSON.parse(item.desc || "[]");
              const descriptions = parsedDesc?.map((descItem) => descItem.desc);
              const actorLevel = item.actorLevel;
              return (
                <div key={index}>
                  {actorLevel >= 4 && (
                    <div className="marquee-alternative" key={index}>
                      <div className="taxts d-flex al-center p-rel">
                        <div
                          className="d-flex jc-center al-center"
                          onClick={() => {
                            goTo(isLive, userId, userId);
                          }}
                        >
                          <img className="border-img p-abs" src={borderImg} alt="" />
                        </div>
                        <img className="user-img p-abs" src={item.portrait ? item.portrait : unknown} alt="" />
                        <div className="text">
                          <div className="content d-flex al-center fd-row">
                            <span className="nick-name">{item.nickname}</span>
                            <p className="d-flex al-center jc-center ">
                              has Won
                              <span className="c-yellow" style={{ marginRight: "1vw" }}>
                                {descriptions}
                              </span>
                              . Congratulations!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </FastMarquee>
        </div>
      )}
    </>
  );
}

export default Marque;
