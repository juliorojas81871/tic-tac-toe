import React, { useState, useEffect } from "react";

const WINNING_COMBO = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const App = () => {
  const [xTurn, setXTurn] = useState(true);
  const [won, setWon] = useState(false);
  const [wonCombo, setWonCombo] = useState([]);
  const [isDraw, setIsDraw] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [boardData, setBoardData] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
  });

  useEffect(() => {
    checkWinner();
    checkDraw();
  }, [boardData]);

  const updateBoardData = (idx) => {
    // will check if the specific idx is empty or no
    if (!boardData[idx] && !won) {
      let value = xTurn === true ? "X" : "O";
      setBoardData({ ...boardData, [idx]: value });
      setXTurn(!xTurn);
    }
  };

  const checkWinner = () => {
    WINNING_COMBO.map((bd) => {
      const [a, b, c] = bd;
      if (
        boardData[a] &&
        boardData[a] === boardData[b] &&
        boardData[a] === boardData[c]
      ) {
        setWon(true);
        setWonCombo([a, b, c]);
        setModalTitle(`Player ${!xTurn ? "X" : "O"} Won!!!`);

        return;
      }
    });
  };

  const checkDraw = () => {
    let check = Object.keys(boardData).every((v) => boardData[v]);
    setIsDraw(check);
    if (check) setModalTitle("Match Draw!!!");
  };

  const reset = () => {
    setBoardData({
      0: "",
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
      7: "",
      8: "",
    });
    setXTurn(true);
    setWon(false);
    setIsDraw(false);
    setWonCombo([]);
    setModalTitle("");
  };

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <div className="game">
        <div className="game_menu">
          <p>{xTurn ? "X Turn" : "O Turn"}</p>
        </div>
        <div className="game_board">
          {[...Array(9)].map((v, idx) => (
            <div
              key={idx}
              onClick={() => updateBoardData(idx)}
              className={`square ${wonCombo.includes(idx) && "highlight"}`}
            >
              {boardData[idx]}
            </div>
          ))}
        </div>
      </div>
      <div className={`modal ${modalTitle ? "show" : ""}`}>
        <div className="modal_title">{modalTitle}</div>
        <button onClick={reset}>New Game</button>
      </div>
    </div>
  );
};

export default App;
