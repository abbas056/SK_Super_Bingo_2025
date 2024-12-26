import React, { useState, useRef, useContext } from "react";
import TopWinners from "./rankings/TopWinners";
import RestWinners from "./rankings/RestWinners";
import { ApiContext } from "../../services/Api";
import Loader from "../common/Loader";
import SeeButton from "../common/SeeButton";
import SubButtons from "../common/SubButtons";

function LeaderBoard({
  topWinners,
  restWinners,
  arrayData,
  maxheight,
  title,
  tab1,
  tab2,
  subTabs,
  setSubTabs,
  subBtn1name,
  subBtn2name,
  eventGifting,
  icon,
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
      <div className="leaderboard p-rel m-auto f-tangoSansItalic" style={{ width: "95%", marginTop: "10vw" }}>
        <div className="leaderboard-title m-auto p-abs d-flex al-center jc-center c-white">
          <img src={title} alt="" />
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {tab1 || eventGifting ? (
              <>
                {eventGifting ? null : <SubButtons subTabs={subTabs} setSubTabs={setSubTabs} subBtn1name={subBtn1name} subBtn2name={subBtn2name} />}
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
                                eventGifting={eventGifting}
                                icon={icon}
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
                                eventGifting={eventGifting}
                                icon={icon}
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
                          restWinners?.map(({ nickname, userScore, userLevel, actorLevel, portrait, userId }, index) => (
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
