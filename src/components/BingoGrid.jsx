import React, { useContext, useEffect, useState } from "react";
import { ApiContext } from "../services/Api";
import { baserUrl } from "../js/baserUrl";
import { callDartApi, cross, overFlowAuto, overFlowHidden, successAlert, unsuccessAlert } from "../js/helpers";
import {
  bingoPlayBtn,
  gamePointsIcon,
  rewardImages,
  star,
  bingoHead,
  congratulationHead,
  oopsHead,
  bingoPopupImage,
  columnLine,
  rowLine,
} from "../utils/images";

const BingoGrid = ({ gamePoints }) => {
  const { userInfo, userId, userToken, refreshApi, disable, setDisable } = useContext(ApiContext);
  const [grid, setGrid] = useState([]);
  const [alert, setAlert] = useState(false);
  const [alertpopup, setAlertpopup] = useState([]);
  const [bingo, setBingo] = useState(false);
  const [input, setInput] = useState(1);
  const [error, setError] = useState("Max value = 999");
  const [successCount, setsuccessCount] = useState("");
  const [cutline, setCutline] = useState(null);
  const [response, setresponse] = useState([]);

  const handleInput = (event) => {
    let value = event.target.value;
    let max = gamePoints < 999 ? gamePoints : 999;
    let val = value.replace(/[^0-9]/g, "");
    let number = parseInt(val) > max ? max : parseInt(val) <= 0 ? 1 : parseInt(val);
    setInput(number);
    if (event.target.value === "") {
      setError("Enter some value");
      setDisable(true);
    } else if (number === max && value.includes(".")) {
      setInput(1);
    } else if (
      input === `${value}.0` ||
      input === `${value}.00` ||
      input === `${value}.000` ||
      input === `${value}.0000` ||
      input === `${value}.00000` ||
      input === `${value}.000000` ||
      input === `${value}.0000000` ||
      input === `${value}.00000000` ||
      input === `${value}.000000000` ||
      input === `${value}.0000000000`
    ) {
      setInput(number);
      setError("Wrong input value");
      setDisable(true);
    } else {
      setError("Max value = 999");
      setDisable(false);
    }
  };

  // Initialize grid
  useEffect(() => {
    if (userInfo?.grid) {
      setGrid(userInfo.grid);
    } else if (userInfo?.msg) {
      setAlert(true);
      setAlertpopup(unsuccessAlert(oopsHead, `Error fetching initial grid: ${userInfo.msg}`));
      overFlowHidden();
    }
  }, [userInfo]);
  const playGame = () => {
    setDisable(true);
    callDartApi(`${baserUrl}api/activity/bingo/bingo?playCount=${input}`, userId, userToken)
      .then((response) => {
        if (response.msg === "success") {
          setresponse(response?.data);
          const firstFill = response?.data?.firstFill;
          const successRounds = response?.data?.successRounds;
          const updatedGrid = grid?.map((row) => row.map((cell) => (cell === firstFill ? "*" : cell)));
          const bonusBeans = response?.data?.bonus;
          const bingoResult = checkBingo(updatedGrid);
          setBingo(bingoResult.isBingo);
          setCutline(bingoResult.cutline); // Save cutline details
          setGrid(updatedGrid);
          setTimeout(() => {
            setsuccessCount(successRounds);
          }, 500);
          setTimeout(() => {
            setAlert(true);
            setAlertpopup(
              successAlert(
                successRounds >= 1 ? bingoHead : congratulationHead,
                successRounds >= 1 ? (
                  <>
                    <div>
                      Congrats! You’ve completed <br /> BINGO{" "}
                      <span className="c-l-yellow">{successRounds === 1 ? `${successRounds} time` : `${successRounds} times`}</span> successfully{" "}
                      <br /> & have won
                    </div>
                    {renderRewards(response?.data?.rewardList)}
                    <span style={{ color: "#ffcd6d", fontSize: "2.8vw" }}>You've also won {bonusBeans} Beans for winning Bingo!</span>
                    Your reward <br /> has been added to your ID.
                  </>
                ) : input > 1 && successRounds === 0 ? (
                  <>
                    <div>
                      You have successfully <br /> marked off <span className="c-l-yellow">{input}</span> random numbers <br />& have won.
                    </div>
                    {renderRewards(response?.data?.rewardList)}
                    Continue marking off the <br /> numbers to win.
                  </>
                ) : (
                  <>
                    <div>
                      You have successfully <br /> marked off <span className="c-l-yellow">{firstFill}</span> <br />& have won.
                    </div>
                    {renderRewards(response?.data?.rewardList)}
                    Continue marking off the <br /> number to achieve a winning <br /> pattern.
                  </>
                )
              )
            );

            refreshApi();
            overFlowHidden();
          }, 1000);
        } else if (response.msg === "GAME_POINT_NOT_ENOUGH") {
          setAlert(true);
          setAlertpopup(
            unsuccessAlert(
              oopsHead,
              <div className="w-70">
                You don’t have enough Game Points <img style={{ width: "5vw", verticalAlign: "middle" }} src={gamePointsIcon} alt="" /> to play BINGO
                right now. Send more event gifts & come back again.
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
      .catch((error) => {
        setAlert(true);
        setAlertpopup(unsuccessAlert(oopsHead, error.message));
        overFlowHidden();
      });
  };
  const checkBingo = (grid) => {
    let cutline = null;

    // Check rows
    for (let i = 0; i < grid.length; i++) {
      if (grid[i].every((cell) => cell === "*")) {
        cutline = { type: "row", index: i };
        return { isBingo: true, cutline };
      }
    }

    // Check columns
    for (let i = 0; i < grid[0].length; i++) {
      if (grid.every((row) => row[i] === "*")) {
        cutline = { type: "column", index: i };
        return { isBingo: true, cutline };
      }
    }

    // Check diagonals
    const leftDiagonal = grid.every((_, index) => grid[index][index] === "*");
    if (leftDiagonal) {
      cutline = { type: "diagonal", direction: "left" };
      return { isBingo: true, cutline };
    }

    const rightDiagonal = grid.every((_, index) => grid[index][grid.length - 1 - index] === "*");
    if (rightDiagonal) {
      cutline = { type: "diagonal", direction: "right" };
      return { isBingo: true, cutline };
    }

    return { isBingo: false, cutline: null };
  };
  const renderRewards = (rewardList) => (
    <div className={rewardList?.length > 4 ? "rews-box-max d-flex al-start jc-center gap-2" : "rews-box d-flex al-start jc-center gap-2"}>
      {rewardList?.map((item, index) => (
        <div className="d-flex al-center jc-center fd-column gap-1" key={index} style={{ width: "20vw" }}>
          <div className="img-box d-flex al-center jc-center">
            <img src={rewardImages(item?.desc)} alt="" />
          </div>
          <div className="name c-l-yellow f-bold f-tangoSansItalic">
            {item?.desc === "Beans" ? (
              <> x{item?.count} Beans</>
            ) : (
              <>
                {item.desc} x{item.count} {item.count === 1 ? "day" : "days"}
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
  const closePopup = () => {
    overFlowAuto();
    setDisable(false);
    setAlert(false);
    setInput(1);
    setTimeout(() => {
      setBingo(false);
      setsuccessCount("");
      setCutline(null);
    }, 500);
  };
  const renderCutline = () => {
    if (!cutline) return null;
    // if (successCount >= 1) {
    //   return (
    //     <img
    //       src={rowLine}
    //       alt="Diagonal Cutline"
    //       className={`cutline diagonal-cutline ${cutline.direction === "left" ? "left-diagonal" : "right-diagonal"}`}
    //     />
    //   );
    // }
    if (cutline.type === "row") {
      return <img src={rowLine} alt="Row Cutline" className={`cutline row-cutline row-${cutline.index}`} />;
    }

    if (cutline.type === "column") {
      return <img src={columnLine} alt="Column Cutline" className={`cutline column-cutline column-${cutline.index}`} />;
    }

    if (cutline.type === "diagonal") {
      return (
        <img
          src={rowLine}
          alt="Diagonal Cutline"
          className={`cutline diagonal-cutline ${cutline.direction === "left" ? "left-diagonal" : "right-diagonal"}`}
        />
      );
    }

    return null;
  };

  return (
    <>
      <div className="bingo-game-container p-rel f-tangoSans">
        <div className="gridContainer p-rel">
          {successCount >= 1 && <img className="bingo-image p-abs" src={bingoPopupImage} alt="" />}
          {grid?.map((row, rowIndex) =>
            row?.map((cell, cellIndex) => (
              <div key={`${rowIndex}-${cellIndex}`} className="gridCell">
                {cell === "*" ? <img style={{ width: "12vw" }} src={star} alt="Matched" className="matchedImage" /> : cell}
              </div>
            ))
          )}
          {renderCutline()}
        </div>
      </div>
      <div className="bingo-game-bottom d-flex al-center jc-center">
        <div className="chances gap-1">
          <input
            className="input-field"
            placeholder="Type here"
            name="NumInput"
            type="number"
            value={input}
            min={0}
            max={999}
            onChange={handleInput}
          />
          <div className="d-flex jc-center">
            <p className="error">{error}</p>
          </div>
        </div>
        <div className="play-button gap-1">
          <button onClick={playGame} disabled={disable}>
            <img className={disable ? "gray-1" : "gray-0"} src={bingoPlayBtn} alt="" />
          </button>
          <span>30k Game Pts Req</span>
        </div>
      </div>

      <div className="overlay" style={{ visibility: alert ? "visible" : "hidden" }}>
        {alert && (
          <div className="game-popup d-flex al-center jc-center f-tangoSans">
            {alertpopup?.map((item, i) => (
              <div
                key={i}
                className="success p-rel d-flex al-center jc-center"
                style={
                  response?.rewardList?.length <= 3
                    ? { height: "85vw" }
                    : response?.rewardList?.length >= 4
                    ? { height: "100vw" }
                    : { height: "60vw" }
                }
              >
                <img className="head p-abs" src={item?.headtext} alt="" />
                <div className="content m-auto p-abs d-flex al-center jc-center">
                  <div className="body-text d-flex al-center jc-center fd-column gap-2">{item.data}</div>
                </div>
                <div className="modal-close p-abs" onClick={closePopup}>
                  <img src={cross()} alt="" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default BingoGrid;
