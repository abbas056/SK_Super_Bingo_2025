import React, { useContext, useEffect, useState } from "react";
import { ApiContext } from "../services/Api";
import { baserUrl } from "../js/baserUrl";
import { callDartApi, cross, overFlowAuto, overFlowHidden, successAlert, unsuccessAlert } from "../js/helpers";
import { bingoPlayBtn, gamePointsIcon, rewardImages, star, bingoHead, congratulationHead, oopsHead, bingoPopupImage } from "../utils/images";

const BingoGrid = ({ gamePoints }) => {
  const { userInfo, userId, userToken, refreshApi } = useContext(ApiContext);
  const [grid, setGrid] = useState([]);
  const [alert, setAlert] = useState(false);
  const [alertpopup, setAlertpopup] = useState([]);
  const [bingo, setBingo] = useState(false);
  const [input, setInput] = useState(1);
  const [error, setError] = useState("Max value = 999");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  // Handle input changes
  const handleInput = (event) => {
    let value = event.target.value;
    let max = gamePoints < 999 ? gamePoints : 999;
    let val = value.replace(/[^0-9]/g, "");
    let number = parseInt(val) > max ? max : parseInt(val) <= 0 ? 1 : parseInt(val);
    setInput(number);
    if (event.target.value === "") {
      setError("Enter some value");
      setButtonDisabled(true);
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
      setButtonDisabled(true);
    } else {
      setError("Max value = 999");
      setButtonDisabled(false);
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

  // Play the game
  const playGame = () => {
    if (gamePoints < 30000) {
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
      return;
    }

    setButtonDisabled(true);
    callDartApi(`${baserUrl}api/activity/bingo/bingo?playCount=${input}`, userId, userToken)
      .then((response) => {
        if (response.msg === "success") {
          const firstFill = response?.data?.firstFill;
          const successRounds = response?.data?.successRounds;
          const updatedGrid = grid?.map((row) => row.map((cell) => (cell === firstFill ? "*" : cell)));
          const numberMatch = response?.data?.rewardContent.match(/\d+/);
          const extractedNumber = numberMatch ? numberMatch[0] : null;
          setGrid(updatedGrid);

          const isBingo = checkBingo(updatedGrid);
          setBingo(isBingo);

          setTimeout(() => {
            setAlert(true);
            setAlertpopup(
              successAlert(
                isBingo ? bingoHead : congratulationHead,
                isBingo ? (
                  <>
                    <div>
                      Congrats! You’ve completed <br /> BINGO <span className="c-yellow">{successRounds}</span> times successfully <br /> & have won
                    </div>
                    {renderRewards(response?.data?.rewardList)}
                    <span style={{ color: "#ffcd6d", fontSize: "2.8vw" }}>You've also won {extractedNumber} Beans for winning Bingo!</span>
                    Your reward <br /> has been added to your ID.
                  </>
                ) : (
                  <>
                    <div>
                      You have successfully <br /> marked off <span className="c-yellow">{firstFill}</span> <br />& have won.
                    </div>
                    {renderRewards(response?.data?.rewardList)}
                    Continue marking off the <br /> number to achieve a winning <br /> pattern.
                  </>
                )
              )
            );

            refreshApi();
            overFlowHidden();
          }, 500);
        } else {
          showErrorPopup(response.msg);
        }
      })
      .catch((error) => {
        showErrorPopup(error.message);
      });
  };

  // Show error popup
  const showErrorPopup = (message) => {
    setAlert(true);
    setAlertpopup(unsuccessAlert(oopsHead, message));
    overFlowHidden();
  };

  // Check for Bingo conditions
  const checkBingo = (grid) => {
    for (let row of grid) {
      if (row.every((cell) => cell === "*")) return true;
    }
    for (let col = 0; col < grid[0]?.length; col++) {
      if (grid?.every((row) => row[col] === "*")) return true;
    }
    const leftDiagonal = grid?.every((_, index) => grid[index][index] === "*");
    const rightDiagonal = grid?.every((_, index) => grid[index][grid?.length - 1 - index] === "*");
    return leftDiagonal || rightDiagonal;
  };

  // Render rewards
  const renderRewards = (rewardList) => (
    <div className={rewardList?.length > 4 ? "rews-box-max d-flex al-start jc-center gap-2" : "rews-box d-flex al-start jc-center gap-2"}>
      {rewardList?.map((item, index) => (
        <div className="d-flex al-center jc-center fd-column gap-1" key={index} style={{ width: "20vw" }}>
          <div className="img-box d-flex al-center jc-center">
            <img src={rewardImages(item?.desc)} alt="" />
          </div>
          <div className="name c-yellow f-bold">
            {item?.desc === "Beans" ? (
              <> {item?.count} Beans</>
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
    setButtonDisabled(false);
    setAlert(false);
    setInput(1);
    setTimeout(() => {
      setBingo(false);
    }, 500);
  };

  return (
    <>
      <div className="bingo-game-container p-rel">
        <div className="gridContainer p-rel">
          {bingo && <img className="bingo-image p-abs" src={bingoPopupImage} alt="" />}
          {grid?.map((row, rowIndex) =>
            row?.map((cell, cellIndex) => (
              <div key={`${rowIndex}-${cellIndex}`} className="gridCell">
                {cell === "*" ? <img style={{ width: "12vw" }} src={star} alt="Matched" className="matchedImage" /> : cell}
              </div>
            ))
          )}
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
          <button onClick={playGame} disabled={buttonDisabled}>
            <img className={buttonDisabled ? "gray-1" : "gray-0"} src={bingoPlayBtn} alt="" />
          </button>
          <span>30k Game Pts Req</span>
        </div>
      </div>

      <div className="overlay" style={{ visibility: alert ? "visible" : "hidden" }}>
        {alert && (
          <div className="game-popup d-flex al-center jc-center f-tangoSans">
            {alertpopup?.map((item, i) => (
              <div key={i} className="success p-rel d-flex al-center jc-center">
                <img className="head p-abs" src={item?.headtext} alt="" />
                <div className="content m-auto p-abs d-flex al-center jc-center">
                  <div className="body-text d-flex al-center jc-center fd-column gap-1">{item.data}</div>
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
