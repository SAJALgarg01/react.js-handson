import Board from "./board.jsx";
import { useState, useEffect } from "react";
import checkWinner from "../Utils/checkwinner";

export default TicTacToe = ({ size = 3 }) => {
  const [board, setBoard] = useState(
    Array.from({ length: size }, () => {
      return Array(size).fill(null);
    })
  );

  const [turnX, setTurnX] = useState(true);

  const winner = checkWinner(board, size);
  console.log(winner);

  const status = winner
    ? `${winner} is winner`
    : turnX
    ? "Player X turn"
    : "Player O turn";

  const handleClick = (rowIdx, colIdx) => {
    console.log(rowIdx, colIdx);
    if (board[rowIdx][colIdx] || winner) return;

    const deepCopy = JSON.parse(JSON.stringify(board));

    deepCopy[rowIdx][colIdx] = turnX ? "X" : "O";
    setBoard(deepCopy);
    setTurnX(!turnX);
  };

  const handleReset = () => {
    setBoard(
      Array.from({ length: size }, () => {
        return Array(size).fill(null);
      })
    );
    setTurnX(true);
  };

  return (
    <div className="container">
      <Board handleClick={handleClick} board={board} size={size} />
      <div className="status">{status}</div>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};
