import React, { useContext, useState } from "react";
import { congratulationHead, oopsHead, rewardImages, spinBtn, vipluckyarrow, vipluckyWheelInner, vipWheelCenter } from "../../utils/images";
import { ApiContext } from "../../services/Api";
import { callDartApi, cross, overFlowAuto, overFlowHidden, successAlert, unsuccessAlert, w2Rotation } from "../../js/helpers";
import { baserUrl } from "../../js/baserUrl";

function VipLuckyWheel() {
  const [FirstWheel, setFirstWheel] = useState("");
  const [playCount, setplayCount] = useState(1);
  const [alertpopup, setAlertpopup] = useState([]);
  const [alert, setAlert] = useState(false);
  const [response, setresponse] = useState([]);
  const { refreshApi, userId, userToken, disable, setDisable } = useContext(ApiContext);

  const playanimation = (i) => {
    setplayCount(i);
  };
  const handleSpin = () => {
    setDisable(true);
    callDartApi(`${baserUrl}api/activity/bingo/talentWheel?playCount=${playCount}&type=2`, userId, userToken)
      .then(function (response) {
        if (response.errorCode === 0) {
          setresponse(response?.data);
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
                    Better luck next time,
                    <br /> you didn't win <br /> any reward this time.
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
                            <div className="name f-tangoSansItalic">
                              {item?.desc == "gems" ? (
                                <> x{item?.count} Gems</>
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
        } else if (response.msg === "the talent points is not enough") {
          setAlert(true);
          setAlertpopup(
            unsuccessAlert(
              oopsHead,
              <div className="w-100 d-flex al-center jc-center">
                Insufficient Points to Spin <br /> the wheel, receive more <br /> event gifts, and Spin again!
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
  };
  const close = () => {
    setAlert(false);
    overFlowAuto();
    setplayCount(1);
    setDisable(false);
  };
  return (
    <>
      <div className="VipluckyWheel-Game d-flex fd-column al-center jc-center gap-3">
        <div className="VipluckyWheel-Game-wheel p-rel">
          <div className="wheel">
            <div className="image-container d-flex al-center jc-center">
              <img className="p-abs w-6vw" style={{ top: "0vw", width: "19vw", zIndex: "1" }} src={vipluckyarrow} alt="" />
              <img className="p-abs center" src={vipWheelCenter} alt="" />
              <img
                src={vipluckyWheelInner}
                alt="Spin the Wheel"
                className={`${`wheel-image ${FirstWheel}`} `}
                style={{ width: "59%", marginTop: "6vw" }}
              />
            </div>
          </div>
        </div>
        <div className="VipluckyWheel-Game-speed d-flex jc-center al-center gap-2">
          <button disabled={disable} className={playCount === 1 ? "gray-0" : "gray-1"} onClick={() => playanimation(1)}>
            x1
          </button>
          <button disabled={disable} className={playCount === 10 ? "gray-0" : "gray-1"} onClick={() => playanimation(10)}>
            x10
          </button>
          <button disabled={disable} className={playCount === 100 ? "gray-0" : "gray-1"} onClick={() => playanimation(100)}>
            x100
          </button>
        </div>
        <button onClick={handleSpin} disabled={disable} className="VipluckyWheel-Game-spin-btn">
          <img className={disable ? "gray-1" : "gray-0"} src={spinBtn} alt="" />
        </button>
      </div>

      <div className="overlay" style={{ visibility: alert ? "visible" : "hidden" }}>
        {alert && (
          <div className="game-popup d-flex al-center jc-center f-tangoSans">
            {alertpopup?.map((item, i) => (
              <div
                key={i}
                className="success p-rel d-flex al-center jc-center"
                style={response?.rewardList?.length > 3 ? { width: "85%", height: "90vw" } : { width: "85%", height: "65vw" }}
              >
                <img className="head p-abs" src={item?.headtext} alt="" />
                <div className="content m-auto p-abs d-flex al-center jc-center" style={{ marginTop: "0vw" }}>
                  <div
                    className="body-text d-flex al-center jc-center fd-column"
                    style={response?.rewardList?.length >= 1 ? { fontSize: "5vw" } : { fontSize: "4vw" }}
                  >
                    {item.data}
                  </div>
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
