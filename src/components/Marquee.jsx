import React, { useContext } from "react";
import FastMarquee from "react-fast-marquee";
import { ApiContext } from "../services/Api";
import { goTo, slicePlease } from "../js/helpers";
import borderImg from "../assets/TickerTapeFrame.png";
import { unknown } from "../utils/images";
function Marque() {
  const { userInfo, bingoToday, isLive, tickertapeLuckyWheel, tickertapeVipLuckyWheel } = useContext(ApiContext);
  const winners = slicePlease(bingoToday?.list, 0, 3);
  const dailyWins = userInfo?.dailyScores;

  return (
    <>
      {bingoToday?.count > 0 && (
        <div className="marque-container f-tangoSansItalic">
          <FastMarquee direction="left" gradient={false} gradientColor={[0, 0, 0]} speed={70}>
            {winners?.map((item, index) => {
              const name = item.nickname;
              const nickName = name.slice(0, 8);
              const userId = item.userId;
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
                        <span className="nick-name">{nickName}</span>
                        <p className="d-flex al-center jc-center ">
                          has Won
                          <span className="c-yellow" style={{ marginRight: "1vw" }}>
                            {dailyWins}
                          </span>
                          BINGO games & has ranked
                          <span className="c-yellow" style={{ marginRight: "1vw" }}>
                            {item?.userLevel}
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
    </>
  );
}

export default Marque;
