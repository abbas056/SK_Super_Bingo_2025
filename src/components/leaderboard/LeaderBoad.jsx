import React, { useState, useRef, useContext } from "react";
import TopWinners from "./rankings/TopWinners";
import RestWinners from "./rankings/RestWinners";
import { ApiContext } from "../../services/Api";
import Loader from "../common/Loader";
import SeeButton from "../common/SeeButton";
import SubButtons from "../common/SubButtons";
import GiftingSubButtons from "../GiftingSubButtons";

function LeaderBoard({
  topWinners,
  restWinners,
  arrayData,
  maxheight,
  title,
  tab1,
  tab2,
  icon,
  subTabs,
  setSubTabs,
  subBtn1name,
  subBtn2name,
  eventGifting,
  beansPotValue,
  giftinglbMiddleButtons,
  setgiftinglbMiddleButtons,
  giftinglbBottomButtons,
  setgiftinglbBottomButtons,
}) {
  const { isLoading } = useContext(ApiContext);
  const [active, setActive] = useState(true);

  const restBoard = useRef(null);
  const handleChangeActive = () => {
    setActive((previous) => {
      return !previous;
    });
    if (!active) {
      restBoard.current.scrollTop = 0;
    }
  };
  return (
    <>
      <div
        className="leaderboard p-rel m-auto f-tangoSansItalic"
        style={eventGifting ? { width: "90%", marginTop: "10vw" } : { width: "95%", marginTop: "10vw" }}
      >
        <div
          className="leaderboard-title m-auto p-abs d-flex al-center jc-center c-white"
          style={arrayData?.count > 3 ? { top: "-6vw" } : { top: "-10vw" }}
        >
          <img src={title} alt="" />
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {tab1 || eventGifting ? (
              <>
                {eventGifting ? (
                  <div className="d-flex fd-column jc-center al-center gap-1">
                    <SubButtons subTabs={subTabs} setSubTabs={setSubTabs} subBtn1name={subBtn1name} subBtn2name={subBtn2name} />
                    <GiftingSubButtons
                      subTabs={giftinglbMiddleButtons}
                      setSubTabs={setgiftinglbMiddleButtons}
                      subBtn1name={"Daily"}
                      subBtn2name={"Overall"}
                    />
                    {giftinglbMiddleButtons.Overall ? null : (
                      <GiftingSubButtons
                        subTabs={giftinglbBottomButtons}
                        setSubTabs={setgiftinglbBottomButtons}
                        subBtn1name={"Today"}
                        subBtn2name={"Yesterday"}
                      />
                    )}
                  </div>
                ) : (
                  <SubButtons subTabs={subTabs} setSubTabs={setSubTabs} subBtn1name={subBtn1name} subBtn2name={subBtn2name} />
                )}
                <div className="rank-section">
                  {arrayData?.count === 0 ? (
                    <p className="no-data">No Records Found</p>
                  ) : (
                    <div className="rank-section-inner">
                      <div className="top-position-holders d-flex jc-center al-start m-auto">
                        {topWinners?.map(({ nickname, userScore, userLevel, actorLevel, portrait, userId }, index) => {
                          return (
                            <div className="user-container p-rel" key={index}>
                              <TopWinners
                                userName={nickname}
                                userScore={userScore}
                                userAvatar={portrait}
                                userId={userId}
                                index={index}
                                userLevel={userLevel}
                                actorLevel={actorLevel}
                                tab1={tab1}
                                icon={icon}
                                subTabs={subTabs}
                                beansPotValue={beansPotValue}
                                eventGifting={eventGifting}
                                giftingSubButtons={giftinglbMiddleButtons}
                                giftingDayButtons={giftinglbBottomButtons}
                                topWinners={topWinners}
                              />
                            </div>
                          );
                        })}
                      </div>
                      <div
                        ref={restBoard}
                        className={active ? "rest-position-holders " : "rest-position-holders rest-position-holders-max"}
                        style={{ maxHeight: `${maxheight}` }}
                      >
                        {restWinners &&
                          restWinners?.map(({ nickname, userScore, userLevel, actorLevel, portrait, userId }, index) => (
                            <div key={index}>
                              <RestWinners
                                userName={nickname}
                                userScore={userScore}
                                userAvatar={portrait}
                                index={index}
                                userId={userId}
                                listNumber={index + 4}
                                userLevel={userLevel}
                                actorLevel={actorLevel}
                                tab1={tab1}
                                icon={icon}
                                subTabs={subTabs}
                                beansPotValue={beansPotValue}
                                eventGifting={eventGifting}
                                giftingSubButtons={giftinglbMiddleButtons}
                                giftingDayButtons={giftinglbBottomButtons}
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                  {arrayData?.count > 10 ? <SeeButton active={active} handleChangeActive={handleChangeActive} /> : null}
                </div>
              </>
            ) : (
              <>
                <div className="rank-section">
                  {arrayData?.count === 0 ? (
                    <p className="no-data f-acme">No Records Found</p>
                  ) : (
                    <div className="rank-section-inner">
                      <div
                        ref={restBoard}
                        className={active ? "rest-position-holders " : "rest-position-holders rest-position-holders-max"}
                        style={{ maxHeight: `${maxheight}` }}
                      >
                        {restWinners &&
                          restWinners?.map(({ nickname, userScore, userLevel, actorLevel, portrait, userId, desc }, index) => (
                            <div key={index}>
                              <RestWinners
                                userName={nickname}
                                userScore={userScore}
                                userAvatar={portrait}
                                index={index}
                                userId={userId}
                                listNumber={index + 1}
                                userLevel={userLevel}
                                actorLevel={actorLevel}
                                tab2={tab2}
                                desc={desc}
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                  {arrayData?.count > 10 ? <SeeButton active={active} handleChangeActive={handleChangeActive} /> : null}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default LeaderBoard;
