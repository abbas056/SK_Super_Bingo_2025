import React, { useContext, useState } from "react";
import { congratulationHead, oopsHead, rewardImages, spinBtn, vipluckyWheelInner } from "../../utils/images";
import { ApiContext } from "../../services/Api";
import { callDartApi, cross, overFlowAuto, overFlowHidden, successAlert, unsuccessAlert, w2Rotation } from "../../js/helpers";
import { baserUrl } from "../../js/baserUrl";

function VipLuckyWheel({ talentPoints }) {
  const [FirstWheel, setFirstWheel] = useState("");
  const [playCount, setplayCount] = useState(1);
  const [alertpopup, setAlertpopup] = useState([]);
  const [alert, setAlert] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const { refreshApi, userId, userToken } = useContext(ApiContext);

  const playanimation = (i) => {
    setplayCount(i);
  };
  const handleSpin = () => {
    setButtonDisabled(true);
    if (!playCount) {
      setAlert(true);
      setAlertpopup(
        unsuccessAlert(
          oopsHead,
          <div className="w-100 d-flex al-center jc-center">
            You need to select any <br /> combo (x1, x10, x100) first in <br /> order to play wheel.
          </div>
        )
      );
      overFlowHidden();
    } else {
      callDartApi(`${baserUrl}api/activity/bingo/talentWheel?playCount=${playCount}&type=2`, userId, userToken)
        .then(function (response) {
          if (response.errorCode == 0) {
            const content = response?.data?.rewardContent;
            const rewardsArray = content.split("+");
            const firstReward = rewardsArray[0].trim();
            w2Rotation(firstReward, setFirstWheel);
            if (response?.data?.rewardContent === "") {
              setTimeout(() => {
                setAlert(true);
                setAlertpopup(
                  successAlert(
                    oopsHead,
                    <div className="w-100 fd-column d-flex al-center jc-center gap-2">
                      Better luck next time, you didn't win any reward this time.
                    </div>
                  )
                );
                overFlowHidden();
                refreshApi();
                setFirstWheel("");
              }, 3500);
            } else {
              setTimeout(() => {
                setAlert(true);
                setAlertpopup(
                  successAlert(
                    congratulationHead,
                    <div className="w-100 fd-column d-flex al-center jc-center gap-2">
                      You have won
                      <div
                        className={
                          response?.data?.rewardList?.length > 6
                            ? "rews-box-max d-flex al-start jc-center gap-2"
                            : "rews-box d-flex al-start jc-center gap-2"
                        }
                      >
                        {response?.data?.rewardList?.map((item, index) => {
                          return (
                            <div className="d-flex al-center jc-center fd-column gap-1" key={index} style={{ width: "20vw" }}>
                              <div className="img-box d-flex al-center jc-center">
                                <img src={rewardImages(item?.desc)} alt="" />
                              </div>
                              <div className="name">
                                {item?.desc == "Beans" ? (
                                  <> {item?.count} Beans</>
                                ) : (
                                  <>
                                    {item.desc} x{item.count} {item.count === 1 ? "day" : "days"}
                                  </>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )
                );
                overFlowHidden();
                refreshApi();
                setFirstWheel("");
              }, 3500);
            }
          } else if (response?.errorCode === 10000004) {
            setAlert(true);
            setAlertpopup(
              unsuccessAlert(
                oopsHead,
                <div className="w-100 d-flex al-center jc-center">
                  Insufficient Points to Spin the wheel, receive more event gifts, and Spin again!
                </div>
              )
            );
            overFlowHidden();
          } else {
            setAlert(true);
            setAlertpopup(unsuccessAlert(oopsHead, response.msg));
            overFlowHidden();
          }
        })
        .catch(function (error) {
          setAlert(true);
          setAlertpopup(unsuccessAlert(oopsHead, error.message));
          overFlowHidden();
        });
    }
  };

  const close = () => {
    setAlert(false);
    overFlowAuto();
    setplayCount(1);
    setButtonDisabled(false);
  };
  return (
    <>
      <div className="VipluckyWheel-Game d-flex fd-column al-center jc-center gap-3">
        <div className="VipluckyWheel-Game-wheel p-rel">
          <div className="wheel">
            <div className="image-container d-flex al-center jc-center">
              <img
                src={vipluckyWheelInner}
                alt="Spin the Wheel"
                className={`${`wheel-image ${FirstWheel}`} `}
                style={{ width: "57%", marginTop: "9.5vw", marginLeft: "1vw" }}
              />
            </div>
          </div>
        </div>
        <div className="VipluckyWheel-Game-speed d-flex jc-center al-center gap-2">
          <button className={playCount === 1 ? "gray-0" : "gray-1"} onClick={() => playanimation(1)}>
            x1
          </button>
          <button className={playCount === 10 ? "gray-0" : "gray-1"} onClick={() => playanimation(10)}>
            x10
          </button>
          <button className={playCount === 100 ? "gray-0" : "gray-1"} onClick={() => playanimation(100)}>
            x100
          </button>
        </div>
        <button onClick={handleSpin} disabled={buttonDisabled} className="VipluckyWheel-Game-spin-btn">
          <img className={buttonDisabled ? "gray-1" : "gray-0"} src={spinBtn} alt="" />
        </button>
      </div>

      <div className="overlay" style={{ visibility: alert ? "visible" : "hidden" }}>
        {alert && (
          <div className="game-popup d-flex al-center jc-center f-tangoSans">
            {alertpopup?.map((item, i) => (
              <div key={i} className="success p-rel d-flex al-center jc-center">
                <img className="head p-abs" src={item?.headtext} alt="" />
                <div className="content m-auto p-abs d-flex al-center jc-center">
                  <div className="body-text d-flex al-center jc-center fd-column">{item.data}</div>
                </div>
                <div className="modal-close p-abs" onClick={close}>
                  <img src={cross()} alt="" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default VipLuckyWheel;
